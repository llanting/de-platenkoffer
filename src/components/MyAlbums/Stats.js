import React, {useState} from 'react';
import { PieChart, Pie, Cell, Sector } from 'recharts';
import Nav from '../Nav';

// Get extra information piechart
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const upperCaseName = jsUcfirst(payload.name);

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}   
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${upperCaseName}: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#eeeeee">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function Stats(props) {

  // Code from Recharts
  const [activeIndex, setIndex] = useState(0);
  const onPieEnter = (data, index) => {
    setIndex(index);
  };

  if (!props.myAlbums) {
    return <p>Loading...</p>
  };

  const onlyGenres = props.myAlbums.reduce((arr, album) => {
    album.genres.forEach((item) => {
      if (arr.filter(e => e.name === item).length > 0) {
        arr.forEach((a) => {
          if (a.name === item) a.value++;
        })
      } else {
        arr.push({
          name: item,
          value: 1,
        })
      }
    })
    return arr;
  }, []);

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
    <Nav />
    <h4>Total number of LP's: {props.myAlbums.length}</h4>
    <p>Genres:</p>
    <PieChart width={750} height={300}>
      <Pie
        data={onlyGenres}
        cx={200}
        cy={150}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        onMouseEnter={onPieEnter}
      >
      {
        onlyGenres.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
      }
      </Pie>
    </PieChart>
    </>
  )
}
