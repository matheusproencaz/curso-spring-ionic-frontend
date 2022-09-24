import { Injectable} from "@angular/core";

@Injectable()
export class ImageUtilService {
    
    dataUriToBlob(dataURI) {
        let byteString = atob(dataURI.split(',')[1]);
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for(let i = 0; i < byteString.length; i++){
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
    }

    // dataBlobToBase64(data): string{
    //     let reader = new FileReader();
    //     let stringBase64 = "";
    //     reader.readAsDataURL(data);
        
    //     reader.onload = () => {
    //         //let base64String = reader.result;
    //         stringBase64 = reader.result.toString();
    //         console.log(reader.result.toString());
    //     }

    //     return stringBase64 ? stringBase64 : '' ;
    // }

    dataBlobToBase64 = (file: File) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

}