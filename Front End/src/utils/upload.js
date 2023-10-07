import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiver");

  try {
    const res = await axios.post("http://localhost:5000/image", data);
    const { url } = res.data.data;
    return url;
  } catch (error) {
    console.log(error);
  }
};
export default upload;
