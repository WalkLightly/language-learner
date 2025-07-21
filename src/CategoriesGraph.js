import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";

const CategoriesGraph = ({ graphData, totalCategoriesCount }) => {
  useEffect(() => {}, [graphData]);

  return (
    <div>
      {graphData &&
        graphData.map((data) => (
          <div key={data.name} style={{ display: "flex", width: "90vw" }}>
            <div
              style={{
                width: "30%",
                textAlign: "right",
                borderRight: "1px solid black",
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 3,
              }}
            >
              {data.name}
            </div>
            <div style={{ width: "70%", display: "flex" }}>
              <div
                style={{
                  width:
                    data.count > 0
                      ? `${(data.count / totalCategoriesCount) * 100}%`
                      : "0px",
                  height: "50px",
                  backgroundColor: "steelblue",
                }}
              ></div>

              <div
                style={{
                  width: "10%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  paddingLeft: 3,
                }}
              >
                {data.count}
              </div>
            </div>
          </div>
        ))}
      {!graphData && (
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
          <Skeleton variant="rectangular" width={370} height={30} />
        </div>
      )}
    </div>
  );
};

export default CategoriesGraph;
