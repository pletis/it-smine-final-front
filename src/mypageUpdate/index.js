import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import {useState} from "react";
import "./index.css";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";
import { Button, message, InputNumber, Form, Spin, Space, Avatar, Progress, Upload, Input } from "antd";
import {UserOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";

function MyPageupdateForm() {
  const history = useHistory();
  const [user, setUser] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  React.useEffect(function () {
    axios
      .get(`${API_URL}/my-page`)
      .then((result) => {
        console.log(result);
        //실제 데이터로 변경
        const contents = result.data.content;
        setUser(contents);
      })
      .catch((error) => {
        console.error("에러발생!!", error);
      });
  }, []);

  const onSubmit = (values) => {
    console.log(localStorage.getItem("Authorization"));
    axios
      .post(
        `${API_URL}/user?`,
        {
          
        },
      )
      .then((result) => {
        console.log(result);
        history.replace("/mypage");
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };
  const onChangeImage = (info) => {
    console.log(info.file.status);
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const imageUrl = info.file.response;
      setImageUrl(imageUrl);
    }
  };
  return (
    <>
      <Form name="프로필 편집" onFinish={onSubmit}>
        <Form.Item
          name="upload"
        >
          <Upload
            name="image"
            action={`${API_URL}/profile`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img id="upload-profile" src={`${API_URL}${imageUrl}`} />
            ) : (
              <div id="upload-profile-placeholder">
                <img src="/images/icons/camera.png"></img>
                <span>이미지를 업로드해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "닉네임을 입력해주세요." }]}    
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="닉네임을 입력해주세요."
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button 
          id="submit"
          size="large"
          htmlType>
            프로필 저장
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default MyPageupdateForm;