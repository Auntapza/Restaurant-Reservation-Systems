"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkSlip;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
function checkSlip(img, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
        const name = Date.now();
        const filePath = `./upload/slip/${name}.png`;
        fs_1.default.writeFileSync(filePath, base64Data, { encoding: "base64" });
        const slipImgPath = `http://localhost:4000/image/slip/${name}.png`;
        const file = fs_1.default.readFileSync(filePath);
        const formData = new form_data_1.default();
        formData.append("files", file);
        //   formData.append("log", "true");
        formData.append("amount", amount);
        try {
            const slipOkRes = yield axios_1.default.post(`https://api.slipok.com/api/line/apikey/37215`, formData, {
                headers: {
                    "x-authorization": "SLIPOK3698A97",
                },
            });
            return {
                imagePath: slipImgPath,
                status: slipOkRes.status,
                slipOkData: slipOkRes.data
            };
        }
        catch (err) {
            if (axios_1.default.isAxiosError(err) && ((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) == 400) {
                return {
                    status: 400,
                    msg: yield err.response.data.message
                };
            }
            else {
                return {
                    msg: "Unexpect Error"
                };
            }
        }
    });
}
