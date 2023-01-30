import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Typography } from "@mui/material";
import { LocalShippingIcon } from "components/Global/Icons";
import { orange, white } from "@mui/material/colors";
import formatFullDate from "helpers/formatFullDate";

const Tracking = ({ data }) => {
  return (
    <Timeline align='right'>
      {data.map((item, i) => {
        return (
          <TimelineItem key={i} style={{ minHeight: "100px" }}>
            {item.proses && (
              <TimelineOppositeContent>
                <Typography variant='body2' color='textSecondary'>
                  {formatFullDate(item.tanggal)}
                </Typography>
              </TimelineOppositeContent>
            )}
            <TimelineSeparator>
              {item.proses ? (
                <TimelineDot
                  style={{ color: white, backgroundColor: orange[500] }}>
                  <LocalShippingIcon />
                </TimelineDot>
              ) : (
                <TimelineDot>
                  <LocalShippingIcon />
                </TimelineDot>
              )}

              {i !== data.length - 1 ? <TimelineConnector /> : <></>}
            </TimelineSeparator>
            <TimelineContent>
              <p className='text-sm capitalize'>{item.status}</p>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default Tracking;
