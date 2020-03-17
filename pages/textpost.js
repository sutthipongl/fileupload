import {useState} from "react";
import Link from 'next/link';
import {
    Button, TextField
} from "@material-ui/core";


// Server side : npm run fileserver
const TextFilePost = () => {


    const [dataTextField, setDataTextField] = useState("");
    const [postResult, setPostresult] = useState();

    const onTextChange = (e) => {
        setDataTextField(e.target.value);
    };

    const onPostClick = async () => {
        const data = new FormData();
        data.append('textdata', dataTextField);

        await fetch("http://localhost:3001/savetext", {
            "method": "POST",
            "body": data
        }).then((result) => {

            if (result.statusText === 'OK') {
                // If server return text result
                result.text()
                    .then(
                        (resText) => {
                            setPostresult(
                                <Link href={resText}>
                                    <a> download</a>
                                </Link>);
                        }
                    );
            }

        });
    };

    return (
        <div>
            <TextField value={dataTextField}
                       multiline
                       onChange={onTextChange}/>
            <Button variant="contained"
                    color="secondary"
                    component="span"
                    onClick={onPostClick}>
                Post
            </Button>
            <div>{postResult}</div>
        </div>

    );

};

export default TextFilePost;