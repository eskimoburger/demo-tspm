import React, { useState } from "react";

export default function test() {
  const dataList = [
    {
      id: 1,
      name: "cerulean",
      year: 2000,
      color: "#98B2D1",
      pantone_value: "15-4020",
    },
    {
      id: 2,
      name: "fuchsia rose",
      year: 2001,
      color: "#C74375",
      pantone_value: "17-2031",
    },
    {
      id: 3,
      name: "true red",
      year: 2002,
      color: "#BF1932",
      pantone_value: "19-1664",
    },
    {
      id: 4,
      name: "aqua sky",
      year: 2003,
      color: "#7BC4C4",
      pantone_value: "14-4811",
    },
    {
      id: 5,
      name: "tigerlily",
      year: 2004,
      color: "#E2583E",
      pantone_value: "17-1456",
    },
    {
      id: 6,
      name: "blue turquoise",
      year: 2005,
      color: "#53B0AE",
      pantone_value: "15-5217",
    },
    {
      id: 7,
      name: "sand dollar",
      year: 2006,
      color: "#DECDBE",
      pantone_value: "13-1106",
    },
    {
      id: 8,
      name: "chili pepper",
      year: 2007,
      color: "#9B1B30",
      pantone_value: "19-1557",
    },
    {
      id: 9,
      name: "blue iris",
      year: 2008,
      color: "#5A5B9F",
      pantone_value: "18-3943",
    },
    {
      id: 10,
      name: "mimosa",
      year: 2009,
      color: "#F0C05A",
      pantone_value: "14-0848",
    },
    {
      id: 11,
      name: "turquoise",
      year: 2010,
      color: "#45B5AA",
      pantone_value: "15-5519",
    },
    {
      id: 12,
      name: "honeysuckle",
      year: 2011,
      color: "#D94F70",
      pantone_value: "18-2120",
    },
    {
      id: 13,
      name: "cerulean",
      year: 2000,
      color: "#98B2D1",
      pantone_value: "15-4020",
    },
    {
      id: 14,
      name: "fuchsia rose",
      year: 2001,
      color: "#C74375",
      pantone_value: "17-2031",
    },
    {
      id: 15,
      name: "true red",
      year: 2002,
      color: "#BF1932",
      pantone_value: "19-1664",
    },
    {
      id: 16,
      name: "aqua sky",
      year: 2003,
      color: "#7BC4C4",
      pantone_value: "14-4811",
    },
    {
      id: 17,
      name: "tigerlily",
      year: 2004,
      color: "#E2583E",
      pantone_value: "17-1456",
    },
    {
      id: 18,
      name: "blue turquoise",
      year: 2005,
      color: "#53B0AE",
      pantone_value: "15-5217",
    },
    {
      id: 19,
      name: "sand dollar",
      year: 2006,
      color: "#DECDBE",
      pantone_value: "13-1106",
    },
    {
      id: 20,
      name: "chili pepper",
      year: 2007,
      color: "#9B1B30",
      pantone_value: "19-1557",
    },
    {
      id: 21,
      name: "blue iris",
      year: 2008,
      color: "#5A5B9F",
      pantone_value: "18-3943",
    },
    {
      id: 22,
      name: "mimosa",
      year: 2009,
      color: "#F0C05A",
      pantone_value: "14-0848",
    },
    {
      id: 23,
      name: "turquoise",
      year: 2010,
      color: "#45B5AA",
      pantone_value: "15-5519",
    },
    {
      id: 24,
      name: "honeysuckle",
      year: 2011,
      color: "#D94F70",
      pantone_value: "18-2120",
    },
  ];
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(dataList);

  // exclude column list from filter
  const excludeColumns = ["id", "color","year"];

  // handle change event of search input
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(dataList);
    else {
      const filteredData = dataList.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  };

  return (
    <div className="App">
      <a href="https://www.cluemediator.com">Clue Mediator</a>
      <br />
      <br />
      Search:{" "}
      <input
        style={{ marginLeft: 5 }}
        type="text"
        placeholder="Type to search..."
        value={searchText}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="box-container">
        {data.map((d, i) => {
          return (
            <div
              key={i}
              className="box"
              style={{ backgroundColor: d.color }}
            >
              <b>Name: </b>
              {d.name}
              <br />
              <b>Year: </b>
              {d.year}
              <br />
              <b>Color: </b>
              {d.color}
              <br />
              <b>Pantone value: </b>
              {d.pantone_value}
            </div>
          );
        })}
        <div className="clearboth"></div>
        {data.length === 0 && <span>No records found to display!</span>}
      </div>
      <style jsx global>{`
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }
        code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
              monospace;
          }
          
          .box-container {
            margin: 10px 0;
          }
          
          .box {
            width: 300px;
            margin: 10px;
            padding: 10px;
            line-height: 25px;
            float: left;
            border-radius: 4px;
            border: 1px solid #999;
          }
          
          .clearboth {
              clear:both;
          }
      `}</style>
    </div>
  );
}
