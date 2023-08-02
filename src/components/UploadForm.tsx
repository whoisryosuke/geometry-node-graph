import React, { ChangeEvent } from 'react'

type Props = {
    updateJson: (text: string) => void
}

const UploadForm = ({
    updateJson
}: Props) => {

    const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
        // console.log(event, event.currentTarget.files)

        if(!event.currentTarget.files) return;

        const file = event.currentTarget.files[0];

        // Grab the file
        const reader = new FileReader() 

        reader.onload = async (e) => { 

            if(!e.target?.result) return;

            const text = (e.target.result) 

            // console.log(text) 
            if(typeof text !== 'string') return;

            updateJson(text);

        }; 
      reader.readAsText(file) 
    }

  return (
    <div style={{position:'absolute', right: 16, top: 16 }}>
        <h2>Preview your nodes</h2>
        <input type="file" id="node-data" name="node-data" accept=".json" onChange={handleFiles} />
    </div>
  )
}

export default UploadForm