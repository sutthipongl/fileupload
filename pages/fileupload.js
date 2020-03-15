import {useState} from "react";
import {
    Button, TextField,
    Card, CardActionArea, CardMedia
} from "@material-ui/core";


// Server side : npm run fileserver
const FileUpload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileNameTextField, setFileNameTextField] = useState("");
    const [uploadResult, setUploadresult] = useState();
    const [imageCard, setImageCard] = useState();

    const onUploadClick = async () => {
        const data = new FormData();
        data.append('file', selectedFile);

        await fetch("http://localhost:3001/upload", {
            "method": "POST",
            "body": data
        }).then((result) => {

            if (result.statusText === 'OK') {
                setImageCard(<img src={`/uploads/${fileNameTextField}`}
                                  alt={fileNameTextField}
                                  style={{"width":"800px","height":"600px"}}
                                  />);
                //If server return json
                // result.json().then(
                //     (myJson) => {
                //         SetUploadresult(
                //             <div>
                //                 {myJson.files.file.name} is uploaded at {myJson.files.file.path}
                //             </div>);
                //     });

                // If server return text result
                result.text()
                    .then(
                        (resText) => {
                            setUploadresult(resText);
                        }
                    );
            }

        });
    };

    return (
        <div>
            <TextField value={fileNameTextField}/>
            <input
                id="contained-button-file"
                type="file"
                style={{"display": "none"}}
                onChange={(e) => {
                    setFileNameTextField(e.target.value.replace(/^.*\\/, ""));
                    setSelectedFile(e.target.files[0]);
                }}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Choose file
                </Button>
            </label>
            <Button variant="contained"
                    color="secondary"
                    component="span"
                    onClick={onUploadClick}>
                Upload
            </Button>
            <div>{uploadResult}</div>
            <div>{imageCard}</div>

        </div>

    );

};

export default FileUpload;