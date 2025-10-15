import { useMemo, useState } from "react";
import { Container, Form, InputGroup, Button, Image } from "react-bootstrap";

// Dữ liệu mẫu
const accounts = [
  {
    id: 1,
    username: "Tiến đẹp trai",
    password: "01",
    avatar:
      "https://i.pinimg.com/736x/52/9a/60/529a60ab59434015c846daa9e177a8bd.jpg",
  },
  {
    id: 2,
    username: "Tiến đẹp gái",
    password: "02",
    avatar:
      "https://i.pinimg.com/736x/1e/dc/49/1edc49cd4c2bce2819cff850c248acde.jpg",
  },
  {
    id: 3,
    username: "Tiến ladyboy",
    password: "03",
    avatar:
      "https://i.pinimg.com/736x/55/03/ab/5503ab70accdb521ad9c2f593cd89830.jpg",
  },
  {
    id: 4,
    username: "Tiến not gay",
    password: "04",
    avatar:
      "https://i.pinimg.com/1200x/41/98/5b/41985bd5042f41f49ad916e0830af7cf.jpg",
  },
];

export default function AccountsSearch() {
  const [q, setQ] = useState("");

  const view = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return accounts;
    return accounts.filter((a) => a.username.toLowerCase().includes(k));
  }, [q]);

  return (
    <Container className="py-4 text-center" style={{background:"#585d62ff"}}>
      <h4 className="mb-4">
        <span role="img" aria-label="search">
          🔍
        </span>{" "}
        Tìm kiếm Account
      </h4>

      {/* Ô tìm kiếm gọn và căn giữa */}
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto 25px auto",
        }}
      >
        <Form>
          <InputGroup>
            <Form.Control
              placeholder="Nhập username cần tìm…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setQ("")}>
              Xoá
            </Button>
          </InputGroup>
        </Form>
      </div>

      {view.length === 0 ? (
        <p className="text-muted">Không tìm thấy kết quả</p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            paddingLeft: 0,
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          {view.map((acc) => (
            <li
              key={acc.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "10px 14px",
                marginBottom: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#eef6ff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f9fafb";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Image
                src={acc.avatar}
                roundedCircle
                width={60}
                height={60}
                style={{
                  objectFit: "cover",
                  border: "2px solid #ddd",
                }}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png";
                }}
              />
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: "#333",
                  }}
                >
                  {acc.username}
                </div>
                <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                  id: {acc.id} • pass: {acc.password}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
