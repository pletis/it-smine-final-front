
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";
import { Button, message,InputNumber,Form, Spin, Space } from "antd";
import ProductCard from "../components/productCard";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Comment from "../comments/comment"


const config = {
  headers: { Authorization: localStorage.getItem("Authorization") },
};

function ProductPage() {
  const { id } = useParams();
  const [userId, setuserId] = useState();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const history = useHistory();

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`, config)
      .then((result) => {
        console.log(result);
        setProduct(result.data);
      })
      .catch((error) => {
        console.error("에러!", error);
      });
  };

  const getRecommendations = () => {
    axios
      .get(
        `https://itsmine-recommend-server.herokuapp.com/products/${id}/recommendation`
      )
      .then((result) => {
        setProducts(result.data.products);
        console.log(result.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deletePost = (postId) => {
    axios
      .delete(`${API_URL}/post/${id}`, config)
      .then((result) => {
        console.log(result);
        alert("삭제완료");
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  useEffect(
    function () {
      let jwtTokenTemp = localStorage.getItem("Authorization");

      if (jwtTokenTemp === null) {
        message.error("로그인 후 이용가능합니다!");
        history.push("/login");
      } else {
        let jwtToken = jwtTokenTemp.replace("Bearer ", "");
        getProduct();
        getRecommendations();
        setuserId(jwt_decode(jwtToken).id);
      }
    },
    [id]
  );

  if (product === null) {
    return (
      <div id="spin-spin">
        <Space size="middle">
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
        </Space>
      </div>
    );
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("구매가 완료되었습니다.");
        getProduct();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };



   
        /**
        *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
        *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
        /*
        var disqus_config = function () {
        this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        };
        */
        (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://itsmine-1.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();
    
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>

  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}${product.imageUrl}`} />
      </div>

      <div id="profile-box">
        <div>
          <img src="/images/icons/avatar.png" />
          <span>{product.user.username}</span>
        </div>
        {product.user.id === userId ? (
          <div id="change-button">
            <Link to={"/updateForm/" + product.id}>
              <Button id="change-button1" size="middle" type="primary">
                수정
              </Button>
            </Link>

            <Button
              size="middle"
              type="primary"
              danger
              onClick={() => deletePost(product.id)}
            >
              삭제
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>

      <div id="contents-box">
        <div>
        <div id="name">{product.title}</div>
        <div id="price">{product.price}원</div>
        <div id="createdAt">
          {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
        </div>
        {
          !product.type ? (
            <div>
              <div>
                <div id="auction-commit">
                  <Form>
                    <Form.Item
                    name="price"
                    label={<div className="upload-label">상품 가격</div>}
                    rules={[{ required: true, message: "상품 가격을 입력해주세요" }]}
                    >
                    <InputNumber
                      className="upload-price"
                      size="large"
                      defaultValue={0}
                    ></InputNumber>
                    </Form.Item>
                    <Button
                    size="large"
                    type="primary"
                    danger
                    >입찰하기</Button>
                  </Form>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <Button
                id="purchase-button"
                size="large"
                type="primary"
                danger
                onClick={onClickPurchase}
                disabled={product.soldout === 1 ? true : false}
                >
                  재빨리 구매하기
                </Button>
              </div>
            </div>
          )
        }
        
        
        <pre id="description">{product.description}</pre>
        </div>
        <div>
          
          
        </div>
      </div>
      
      
      <div>
        <h1>추천 상품</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      </div>
      <div id="disqus_thread"></div>
    </div>
  );
}

export default ProductPage;
