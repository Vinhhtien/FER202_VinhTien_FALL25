import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import HomeCarousel from '../components/HomeCarousel';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';
import Filter from '../components/Filter';
import AppNavBar from '../components/AppNavBar';

export default function HomePage() {
  return (
    <div>
      <AppNavBar />
      
      <Container className="py-3">
        <HomeCarousel />
        
        <div className="mt-4">
          <h4 style={{color:'red'}}>Featured Movies Collections</h4>
          <p style={{ color: '#4da6ff' }}>
            Thông tin về các bộ sưu tập phim nổi bật ở đây.
          </p>
        </div>

        <Filter/>

        <Row className="g-3 mt-1">
          {movies.map((m) => (
            <Col key={m.id} xs={12} md={6} lg={4}>
              <MovieCard movie={m} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}


// đã có backend để hoạt động được filter

// import { useMemo, useState } from 'react';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';
// import HomeCarousel from '../components/HomeCarousel';
// import MovieCard from '../components/MovieCard';
// import { movies } from '../data/movies';
// import Filter from '../components/Filter';
// import AppNavBar from '../components/AppNavBar';

// function matchYear(range, y) {
//   switch (range) {
//     case 'lte2000':    return y <= 2000;
//     case '2001-2015':  return y >= 2001 && y <= 2015;
//     case 'gt2015':     return y > 2015;
//     default:           return true; // 'all'
//   }
// }

// const comparators = {
//   'year-desc':     (a,b) => b.year - a.year,
//   'year-asc':      (a,b) => a.year - b.year,
//   'title-asc':     (a,b) => a.title.localeCompare(b.title),
//   'title-desc':    (a,b) => b.title.localeCompare(a.title),
//   'duration-asc':  (a,b) => a.duration - b.duration,
//   'duration-desc': (a,b) => b.duration - a.duration,
// };

// export default function HomePage() {
//   // 1) State điều khiển cho Filter (controlled props)
//   const [keyword, setKeyword]     = useState('');
//   const [yearRange, setYearRange] = useState('all');
//   const [sortBy, setSortBy]       = useState('year-desc');

//   // 2) Tính danh sách hiển thị sau khi search + filter + sort
//   const view = useMemo(() => {
//     const q = keyword.trim().toLowerCase();

//     let list = movies.filter(m => {
//       if (!q) return true;
//       return (
//         m.title.toLowerCase().includes(q) ||
//         (m.description ?? '').toLowerCase().includes(q)
//       );
//     });

//     list = list.filter(m => matchYear(yearRange, m.year));

//     const cmp = comparators[sortBy] ?? (() => 0);
//     return [...list].sort(cmp);
//   }, [keyword, yearRange, sortBy]);

//   return (
//     <div>
//       <AppNavBar />

//       <Container className="py-3">
//         <HomeCarousel />

//         <div className="mt-4">
//           <h4 style={{color:'red'}}>Featured Movies Collections</h4>
//           <p style={{ color: '#4da6ff' }}>
//             Thông tin về các bộ sưu tập phim nổi bật ở đây.
//           </p>
//         </div>

//         {/* 3) Truyền state + handler xuống Filter */}
//         <Filter
//           keyword={keyword}
//           onKeyword={setKeyword}
//           yearRange={yearRange}
//           onYearRange={setYearRange}
//           sortBy={sortBy}
//           onSortBy={setSortBy}
//         />

//         <Row className="g-3 mt-1">
//           {view.map((m) => (
//             <Col key={m.id} xs={12} md={6} lg={4}>
//               <MovieCard movie={m} />
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </div>
//   );
// }
