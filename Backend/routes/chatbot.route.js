const express = require('express');
const router = express.Router();
const Product = require('../models/product.model'); // ✅ ĐÚNG

// ================== SYSTEM PROMPT ==================
const SYSTEM_INSTRUCTION = `Bạn là trợ lý AI chuyên nghiệp của shop thời trang trực tuyến.

NHIỆM VỤ:
- Tư vấn phong cách, phối đồ cho khách hàng
- Gợi ý sản phẩm phù hợp với ngân sách, dáng người, sở thích
- Trả lời về size, chất liệu, giá cả, vận chuyển, đổi trả
- Động viên khách hàng tự tin với lựa chọn

PHONG CÁCH: Thân thiện, nhiệt tình, dùng emoji phù hợp 👗💕
LƯU Ý: Trả lời ngắn gọn 2-4 câu, không dài dòng.`;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

// ================== POST /api/chatbot/chat ==================
router.post('/chat', async (req, res) => {
  try {
    const { message, chatHistory = [] } = req.body; // ❌ XÓA products = []

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Tin nhắn không hợp lệ'
      });
    }

    // 🔥🔥🔥 TỰ ĐỘNG LẤY SẢN PHẨM TỪ DATABASE 🔥🔥🔥
    const products = await Product.find({})
      .select('name price description category colors sizes stock image')
      .limit(30); // Lấy 30 sản phẩm

    // ================== THÊM CONTEXT SẢN PHẨM ==================
    let fullMessage = `${SYSTEM_INSTRUCTION}\n\n---\n\n`;

    if (products && products.length > 0) {
      const productList = products.map((p, idx) => {
        // Chuyển đổi đường dẫn tương đối thành URL đầy đủ
        let imageUrl = p.image || '';
        if (imageUrl && !imageUrl.startsWith('http')) {
          imageUrl = `http://localhost:5000${imageUrl}`;
        }
        
        return `${idx + 1}. ${p.name} - ${Number(p.price).toLocaleString('vi-VN')}đ
   📂 Danh mục: ${p.category}
   🎨 Màu: ${p.colors?.join(', ') || 'N/A'}
   📏 Size: ${p.sizes?.join(', ') || 'N/A'}
   📦 Còn: ${p.stock} cái
   ℹ️ ${p.description || ''}
   🔗 ${imageUrl}`;
      }).join('\n\n');

      fullMessage += `[SẢN PHẨM HIỆN CÓ TRONG SHOP]\n${productList}\n\n---\n\n`;
    } else {
      fullMessage += `[CHƯA CÓ SẢN PHẨM NÀO TRONG KHO]\n\n`;
    }

    fullMessage += `KHÁCH HÀNG HỎI:\n${message}`;

    // ================== CẤU HÌNH CONTENTS ==================
    const contents = [
      ...chatHistory
        .filter(msg => msg.role && msg.content)
        .map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
      {
        role: 'user',
        parts: [{ text: fullMessage }]
      }
    ];

    // ================== GỌI GEMINI API ==================
    let fetchFn = globalThis.fetch || null;
    if (!fetchFn) {
      try {
        const mod = await import('node-fetch');
        fetchFn = mod.default || mod;
      } catch (err) {
        fetchFn = null;
      }
    }

    if (!fetchFn) {
      return res.status(500).json({
        success: false,
        error: 'Server không hỗ trợ global fetch. Cài `node-fetch` hoặc dùng Node >=18.'
      });
    }

    const response = await fetchFn(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.8,
          topP: 0.95
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Gemini API Error:', errorData);

      if (response.status === 401) {
        return res.status(401).json({
          success: false,
          error: 'API Key Gemini không hợp lệ'
        });
      }

      if (response.status === 429) {
        return res.status(429).json({
          success: false,
          error: 'Đã hết quota Gemini hôm nay'
        });
      }

      throw new Error(errorData.error?.message || 'API Error');
    }

    const data = await response.json();
    
    // ================== LẤY RESPONSE ==================
    const text = 
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Xin lỗi, tôi không thể trả lời câu hỏi của bạn lúc này.';

    return res.json({
      success: true,
      message: text
    });

  } catch (error) {
    console.error('❌ Chatbot Error:', error);

    return res.status(500).json({
      success: false,
      error: 'Lỗi chatbot AI: ' + error.message
    });
  }
});

// ================== GET /api/chatbot/test ==================
router.get('/test', (req, res) => {
    res.json({
      status: 'OK',
      service: 'Gemini AI Chatbot (gemini-2.5-flash)',
      apiKeyConfigured: !!process.env.GEMINI_API_KEY
    });
});

module.exports = router;