import { useState } from "react";
import chatIcon from "../assets/images/chatbot.svg";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { role: "user", content: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          chatHistory: newChat
        })
      });

      const data = await res.json();

      if (data.success) {
        setChat(prev => [...prev, { 
          role: "assistant", 
          content: data.message 
        }]);
      }
    } catch (error) {
      console.error(error);
      setChat(prev => [...prev, { 
        role: "assistant", 
        content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 HÀM RENDER TIN NHẮN VỚI ẢNH
  const renderMessage = (content) => {
    // Tìm tất cả link ảnh trong tin nhắn (http/https + .jpg/.png/.svg/... hoặc các query params)
    const imageRegex = /(https?:\/\/[^\s\n]+\.(?:jpg|jpeg|png|gif|webp|svg)(?:\?[^\s\n]*)?)/gi;
    const images = content.match(imageRegex) || [];
    
    // Tách text và ảnh
    let textContent = content;
    images.forEach(img => {
      textContent = textContent.replace(img, ''); // Xóa link ảnh khỏi text
    });

    return (
      <>
        {/* Hiển thị text */}
        {textContent.trim() && (
          <div style={{ marginBottom: 8, whiteSpace: 'pre-wrap' }}>
            {textContent.trim()}
          </div>
        )}
        
        {/* Hiển thị ảnh */}
        {images.length > 0 && (
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {images.map((imgUrl, idx) => (
              <div key={idx} style={{ display: 'inline-block' }}>
                <img
                  src={imgUrl.trim()}
                  alt={`Sản phẩm ${idx + 1}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: 200,
                    height: 'auto',
                    borderRadius: 8,
                    cursor: 'pointer',
                    border: '2px solid #ddd',
                    transition: 'transform 0.2s'
                  }}
                  onClick={() => window.open(imgUrl.trim(), '_blank')}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.borderColor = '#ff69b4';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.borderColor = '#ddd';
                  }}
                  onError={(e) => {
                    e.target.alt = 'Lỗi tải ảnh';
                    e.target.style.display = 'block';
                    e.target.textContent = '❌ Không thể tải ảnh';
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
      {/* NÚT ICON CHAT */}
      {!open && (
        <img
          src={chatIcon}
          alt="Chat"
          onClick={() => setOpen(true)}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}
        />
      )}

      {/* KHUNG CHAT */}
      {open && (
        <div
          style={{
            width: 350,
            height: 500,
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* HEADER */}
          <div
            style={{
              background: "#060304",
              color: "#fff",
              padding: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 'bold' }}>
              💬 Trợ lý thời trang
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 20,
                cursor: "pointer"
              }}
            >
              ✕
            </button>
          </div>

          {/* BODY */}
          <div
            style={{
              flex: 1,
              padding: 12,
              overflowY: "auto",
              background: '#f9f9f9'
            }}
          >
            {chat.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                color: '#999', 
                marginTop: 20,
                fontSize: 13
              }}>
                Xin chào! Mình có thể giúp gì cho bạn? 👋
              </div>
            )}
            
            {chat.map((c, i) => (
              <div
                key={i}
                style={{
                  textAlign: c.role === "user" ? "right" : "left",
                  marginBottom: 12
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: 12,
                    background: c.role === "user" ? "#ff69b4" : "#fff",
                    color: c.role === "user" ? "#fff" : "#000",
                    maxWidth: '80%',
                    textAlign: 'left',
                    fontSize: 13,
                    boxShadow: c.role === "assistant" ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  {c.role === "user" ? c.content : renderMessage(c.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ textAlign: 'left', marginBottom: 12 }}>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 12px',
                  borderRadius: 12,
                  background: '#fff',
                  color: '#999',
                  fontSize: 13
                }}>
                  Đang suy nghĩ...
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}
          <div style={{ 
            padding: 10, 
            borderTop: "1px solid #ddd",
            background: '#fff',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Nhập tin nhắn..."
                style={{ 
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: 20,
                  outline: 'none',
                  fontSize: 13
                }}
              />
              <button 
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                style={{ 
                  padding: '8px 16px',
                  background: '#ff69b4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 20,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: 13,
                  fontWeight: 'bold',
                  opacity: loading || !message.trim() ? 0.5 : 1
                }}
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}