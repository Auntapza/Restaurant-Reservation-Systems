import axios from "axios";
import FormData from "form-data";
import fs from "fs"

export default async function checkSlip(img: string, amount: number) {

      const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
      const name = Date.now();
      const filePath = `./upload/slip/${name}.png`
      fs.writeFileSync(filePath, base64Data, { encoding: "base64" });
      const slipImgPath = `http://localhost:4000/image/slip/${name}.png`;

      const file = fs.readFileSync(filePath);

      const formData = new FormData();
      formData.append("files", file);
    //   formData.append("log", "true");
      formData.append("amount", amount);

      try {
        const slipOkRes = await axios.post(
            `https://api.slipok.com/api/line/apikey/37215`,
            formData,
            {
              headers: {
                "x-authorization": "SLIPOK3698A97",
              },
            }
          );

        return {
            imagePath: slipImgPath,
            status: slipOkRes.status,
            slipOkData: slipOkRes.data
        }

      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status == 400) {
            return {
                status: 400,
                msg: await err.response.data.message
            }
        } else {
            return {
                msg: "Unexpect Error"
            }
        }
      }

}