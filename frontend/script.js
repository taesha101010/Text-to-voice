document.getElementById("generateBtn").addEventListener("click", async () => {
  const textInput = document.getElementById("textInput");
  const audioPlayer = document.getElementById("audioPlayer");
  const generateBtn = document.getElementById("generateBtn");
  const text = textInput.value.trim();

  console.log("Text input:", text);

  if (!text) {
    alert("Please enter some text.");
    return;
  }

  // Disable button during request
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";

  try {
    const res = await fetch("http://127.0.0.1:5000/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    console.log("Fetch response:", res);

    if (!res.ok) {
      throw new Error("Server returned an error.");
    }

    const blob = await res.blob();
    const audioURL = URL.createObjectURL(blob);

    audioPlayer.src = audioURL;
    await audioPlayer.play(); // Autoplay
    console.log("Audio playback started ✅");

  } catch (err) {
    console.error("Fetch error ❌:", err);
    alert("Something went wrong while generating the audio.");
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Audio";
  }
});
