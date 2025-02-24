
const url1 =
  "https://api-lr.agent.ai/v1/agent/4ofd6dh7j800sr2w/webhook/bd061028";
const prompt = "create a restaurant website";
const url2 =
  "https://api-lr.agent.ai/v1/agent/je1n8kl5uvqouqs2/webhook/e0804b4e";
let data = "";
export const EnhancePrompt = async (text) => {
  try {
    const response = await fetch(url1, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_input: text,
      }),
    });
    data = await response.json();
    const data4 = String(data.response);
    console.log(data4)
    return data4;
  } catch (err) {
    console.log(err);
  }
};
export const createWebsite = async () => {
  try {
    const response2 = await fetch(url2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        enhanced_prompt: String(data.response),
      }),
    });
    let data2 = await response2.json();
    data2 = String(data2.response);
    console.log(data2)
    return data2;
  } catch (err) {
    console.log(err);
  }
};
export const runProcess = async (promptData) => {
  const data1 = await EnhancePrompt(promptData);

  const data3 = await createWebsite(data1);

  return data3;
};