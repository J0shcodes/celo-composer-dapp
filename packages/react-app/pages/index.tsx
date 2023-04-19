import { useCelo } from "@celo/react-celo";
import { useState, useRef } from "react";

import {imageStorageAbi} from "../imageStorage.abi";

export default function Home() {
  const { connect, address, kit } = useCelo();

  const [imageTitle, setImageTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [getImageTitle, setGetImageTitle] = useState("");
  const [returnedUrl, setReturnedUrl] = useState("");
  const [message, setMessage] = useState("");

  const imageStorageContractAddress =
    "0x664F1dfe26fdf8fBBa97545F487F59A156086d3A";

  const saveImage = async () => {
    const contract = new kit.connection.web3.eth.Contract(
      imageStorageAbi,
      imageStorageContractAddress
    );

    const result = await contract.methods
      .addImageUrl(imageTitle, imageUrl)
      .send({ from: address });
    console.log(result);
    if (result.status === true) {
      setMessage("Image successfully saved");
    } else {
      setMessage("Image not saved succesfully");
    }
  };

  const getImage = async () => {
    setMessage("");
    setImageTitle("");
    setImageUrl("");
    const contract = new kit.connection.web3.eth.Contract(
      imageStorageAbi,
      imageStorageContractAddress
    );

    const result = await contract.methods.getImageUL(getImageTitle).call({from: address});
    setReturnedUrl(result);   
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-[40%]">
        {!address ? (
          <div className="text-center">
            <button
              className="bg-blue-500 rounded-md py-2.5 px-5 text-white"
              onClick={connect}
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div>
            {message !== "" ? <div className="text-sm mb-2 text-center">{message}</div> : null}
            <div className="mb-5">
              <div>
                <div className="flex justify-between">
                  <div>
                    <div>
                      <label className="text-sm">Image Title</label>
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="border border-black border-solid rounded outline-none py-1 px-2"
                        onChange={(e) => setImageTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="text-sm">Image URL</label>
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="border border-black border-solid rounded outline-none py-1 px-2"
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <button
                    className="bg-blue-500 rounded-md py-2 px-5 text-white"
                    onClick={saveImage}
                  >
                    Save Image
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="mt-5 text-center">
              <div>
                <input
                  type="text"
                  className="border border-black border-solid rounded outline-none py-1 px-2"
                  onChange={(e) => setGetImageTitle(e.target.value)}
                />
              </div>
              <div className="text-center mt-3">
                <button
                  className="bg-blue-500 rounded-md py-2 px-5 text-white"
                  onClick={getImage}
                >
                  Get Image
                </button>
              </div>
              <div className="bg-white w-full h-[50px] border border-black border-solid rounded-md mt-3 text-center">
                {returnedUrl ? returnedUrl : ""}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
