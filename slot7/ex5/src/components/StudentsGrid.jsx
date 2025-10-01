import StudentCard from "./StudentCard";

const students = [
  {
    id: "DE160182",
    name: "Nguyễn Hữu Quốc Khánh",
    location: "DaNang",
    photo: "https://weart.vn/wp-content/uploads/2025/06/chang-trai-tre-voi-mai-toc-dau-nam-mim-cuoi-nhe-nhang.jpg"
  },
  {
    id: "DE160377",
    name: "Đặng Vĩnh Thiện",
    location: "QuangNam",
    photo: "https://haycafe.vn/wp-content/uploads/2022/02/Anh-trai-dep-dau-nam-cuoi-mim-450x600.jpg"
  },
  {
    id: "DE160547",
    name: "Đỗ Nguyên Phúc",
    location: "QuangNam",
    photo: "https://kenh14cdn.com/2020/6/30/img0096-1592366363868430058761-1593507888983990295582.jpeg"
  },
  {
    id: "DE170049",
    name: "Lê Hoàng Minh",
    location: "DaNang",
    photo: "https://www.anhnghethuatdulich.com/wp-content/uploads/2025/08/chup-hinh-can-mat-dep.jpg"
  },
  {
    id: "DE160547",
    name: "Đỗ Nguyên Phúc",
    location: "QuangNam",
    photo: "https://i.vietgiaitri.com/2021/3/28/ngam-nhung-buc-anh-the-lam-can-cuoc-cong-dan-cua-cac-co-cau-hoc-tro-than-thai-dinh-cua-chop-78e-5665478.jpg"
  },
  {
    id: "DE170049",
    name: "Lê Hoàng Minh",
    location: "DaNang",
    photo: "https://file.hstatic.net/200000503583/file/chup-anh-goc-nghieng-nam__22__0102113bfb3e46d080018dbb43e8a24d.jpg"
  }
];

export default function StudentsGrid() {
  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">Students Detail</h3>
      <div className="row g-4">
        {students.map((s, i) => (
          <div className="col-12 col-md-6" key={i}>
            <StudentCard student={s} />
          </div>
        ))}
      </div>
    </div>
  );
}
