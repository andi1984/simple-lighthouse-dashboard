import React, { Fragment } from "react";
import Chart  from "react-apexcharts";
import { Icon } from "semantic-ui-react";
const Result = ({ series, labels, report }) => {
  const options = {
    labels
  };
  return (
    <Fragment>
      <a href={report} target="_blank">
        View Report <Icon fitted name="external alternate" />
      </a>
      <Chart series={series} options={options} type="radialBar" />
    </Fragment>
  );
};

export default Result;
