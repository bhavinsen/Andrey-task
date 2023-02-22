import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import Editor from "./textEditor";
import axios from "axios";
import {PORTAL_URL} from '../url'

const Dashboard = () => {
  const [openModel, setOpenModel] = useState(false);
  const [contentData, setContentData] = useState({ content: "" });
  const [getContentData, setGetContentData] = useState([]);

  const saveContent = async () => {
    await axios
      .post(`${PORTAL_URL.api_url}/content`, contentData)
      .then((resp) => {
        if (resp.status === 200) {
          setOpenModel(false);
          axios
            .get(`${PORTAL_URL.api_url}/getcontent`)
            .then((resp) => {
              setGetContentData(resp?.data?.content);
            });
        }
      });
  };

  useEffect(() => {
    axios.get(`${PORTAL_URL.api_url}/getcontent`).then((resp) => {
      setGetContentData(resp?.data?.content);
    });
  }, []);

  return (
    <div>
      <button
        onClick={() => setOpenModel(true)}
        className="bg-blue-500 px-8 py-2 rounded-lg mt-5 ml-11 text-white"
      >
        Create Page
      </button>
      {openModel && (
        <>
          <Modal
            open={openModel}
            footer={null}
            closable={false}
            className="modal-custom relative"
            width="880px"
            destroyOnClose={true}
            maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
            // onCancel={handleCancel}
          >
            <img
              className="ml-auto w-[40px] absolute top-0 right-0"
              alt="close-icon"
              src="./assets/close.png"
              onClick={() => setOpenModel(false)}
            />
            <Editor contentData={contentData} setContentData={setContentData} />
            <div className="w-full flex justify-center items-center">
              <button
                onClick={() => {
                  saveContent();
                }}
                className="bg-green-900 py-2 px-9 text-white font-bold text-base mt-4 w-fit rounded-md"
              >
                Save
              </button>
            </div>
          </Modal>
        </>
      )}

      <div className="ml-14 mt-7">
        {getContentData.length <= 0 ?
        <div className="items-center h-[calc(100vh-100px)] flex justify-center font-medium text-3xl"> No Data Found </div>
        : getContentData?.map((item) => {
          return (
            <div class="max-w-xl rounded overflow-hidden">
              <div class="px-6 py-4">
                <p class="text-gray-700 text-base">{item.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
