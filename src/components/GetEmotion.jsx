import { useState, useEffect, useRef } from "react";
import axios from "axios";
import MusicPlayer from "./MusicPlayer";
import toast, { Toaster } from "react-hot-toast";

function GetEmotion() {
  const [emotion, setEmotion] = useState("happy");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg");
    }
    return null;
  };

  const detectEmotion = async () => {
    const imageBase64 = captureImage();
    if (!imageBase64) {
      toast.error("Failed to capture image.");
      return;
    }

    const toastId = toast.loading("Scanning your emotion...");

    try {
      setLoading(true);
      const blob = await fetch(imageBase64).then((res) => res.blob());
      const formData = new FormData();
      formData.append("image", blob, "captured_image.jpg");

      const response = await axios.post("https://python-ai-model-service.onrender.com/predict", formData);
      const detectedEmotion = response.data.emotion;
      setEmotion(detectedEmotion);

      toast.success(`Detected Emotion: ${detectedEmotion}`, { id: toastId });
    } catch (error) {
      console.error("Error detecting emotion:", error);
      toast.error("Error detecting emotion.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startVideo();
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="texthead">Let’s find your mood</h1>

      {/* Hidden video stream */}
      <video ref={videoRef} autoPlay style={{ display: "none" }} />

      <button
        onClick={detectEmotion}
        className="glow-button"
        style={{ background: "black", margin: "10px" }}
      >
        Detect Emotion
      </button>

      {/* {!loading && <p>Detected Emotion: {emotion}</p>} */}

      <MusicPlayer emotion={emotion} loading={loading} />
    </div>
  );
}

export default GetEmotion;
