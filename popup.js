document.getElementById("extractButton").addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.runtime.sendMessage(
      { action: "extractJobInfo", tabId: tab.id },
      async (response) => {
        if (chrome.runtime.lastError) {
          throw new Error(chrome.runtime.lastError.message);
        }

        if (response && response.pageContent) {
          const { pageContent, currentUrl } = response;

          // Use GPT-4o-mini to extract company name and position name
          const apiKey = await getOpenAIApiKey();
          if (apiKey) {
            const extractionResult = await extractWithGPT4oMini(
              pageContent,
              currentUrl,
              apiKey
            );
            const result = `Company: ${extractionResult.companyName}\nPosition: ${extractionResult.positionName}\nURL: ${currentUrl}`;

            document.getElementById("result").textContent = result;

            // Copy each piece of information separately with a delay
            await copyToClipboardWithDelay(
              "Company",
              extractionResult.companyName,
              0
            );
            await copyToClipboardWithDelay(
              "Position",
              extractionResult.positionName,
              300
            );
            await copyToClipboardWithDelay("URL", currentUrl, 600);
          } else {
            document.getElementById("result").textContent =
              "Error: OpenAI API key not provided.";
          }
        } else {
          document.getElementById("result").textContent =
            "Error: Unable to extract job information.";
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").textContent = `Error: ${error.message}`;
  }
});

async function copyToClipboardWithDelay(label, text, delay) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        await navigator.clipboard.writeText(text);
        console.log(`${label} copied to clipboard`);
        resolve();
      } catch (err) {
        console.error(`Failed to copy ${label}: `, err);
        resolve(); // Resolve even if there's an error to continue the sequence
      }
    }, delay);
  });
}

async function copyToClipboard(label, text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log(`${label} copied to clipboard`);
  } catch (err) {
    console.error(`Failed to copy ${label}: `, err);
  }
}

async function getOpenAIApiKey() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["openaiApiKey"], (result) => {
      if (result.openaiApiKey) {
        resolve(result.openaiApiKey);
      } else {
        const apiKey = prompt("Please enter your OpenAI API key:");
        if (apiKey) {
          chrome.storage.sync.set({ openaiApiKey: apiKey }, () => {
            resolve(apiKey);
          });
        } else {
          resolve(null);
        }
      }
    });
  });
}

async function extractWithGPT4oMini(pageContent, currentUrl, apiKey) {
  const prompt = `Extract the company name and position name from the following job posting content. Return the result as a JSON object with keys "companyName" and "positionName". If you can't find the information, use "Unknown" as the value.
    But before you give up, maybe you can find the company name in the URL.
    \n\nContent: ${pageContent}\n\nURL: ${currentUrl}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("API Response:", data); // Debugging line to check the response

  // Ensure the response content is valid JSON
  let messageContent = data.choices[0].message.content.trim();
  if (messageContent.startsWith("```json")) {
    messageContent = messageContent.slice(7, -3).trim(); // Remove ```json and ```
  }
  return JSON.parse(messageContent);
}

// Remove the Clear API Key button
// const clearApiKeyButton = document.createElement('button');
// clearApiKeyButton.textContent = 'Clear API Key';
// clearApiKeyButton.addEventListener('click', () => {
//     chrome.storage.sync.remove('openaiApiKey', () => {
//         console.log('API key cleared');
//     });
// });
// document.body.appendChild(clearApiKeyButton);
