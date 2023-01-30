import { jsPDF } from "jspdf";
import React, { useRef, useEffect } from "react";
import styled from 'styled-components';
import { renderToString } from 'react-dom/server';
import ReactHtmlParser from 'html-react-parser'
import dateFormat from 'dateformat';

import { getDataInvoices_Report } from 'constants/api/report';
import AlamatKantor from 'data/alamat.json';
import { data } from "autoprefixer";
import PDFFile from 'components/invoices/PDFFile';


const PrintToPDF = ({ data }) => {
  useEffect(() => {
    if (data) {
      handleGeneratePdf()
    }
  }, [data])
  // console.log('daatttaa', data)
  const certificateTemplateRef = useRef(null);
  // Create a Title component that'll render an <h1> tag with some styles
  const Title = styled.div`
      font-size: 10pt;
      color: black;
    `;


  // Create a Wrapper component that'll render a <section> tag with some styles
  const Wrapper = styled.section`
    width: 595px;
    height: 842px;
    padding: 5px;
    background: white;
  `;


  var nama_report = "Report_invoice_" + data?.invoices?.data[0].id_invoice + ".pdf";

  const handleGeneratePdf = () => {

    const doc = new jsPDF({
      format: "a4",
      unit: "px"

    });
    doc.html(renderToString(<PDFFile data={data} />), {
      autoPaging: 'text',
      margin: [15, 10, 10, 0],
      async callback(doc) {
        // save the document as a PDF
        doc.save(nama_report);
      }
    });
  };



  if (data?.invoices?.data[0].id_invoice != this.props.match.params.id) {


    return (

      <div id="overlay" className="content-center" style={{ marginTop: "200px", marginLeft: "600px" }} >
        <img src="/failed.gif" alt="Loading" />
        <br></br>
        Please Waiting A Moment For Download...
      </div >



    );





  } else {

    return (

      <div id="overlay" className="content-center" style={{ marginTop: "200px", marginLeft: "500px" }} >
        <img src="/successfull.gif" alt="Loading" />
        <br></br>
        <div style={{ marginLeft: "50px" }}> Successfull Downloaded.Thank You..</div>
      </div >



    );


  }








};

export default PrintToPDF;



export async function getServerSideProps({ req, params }) {
  const { id } = params;
  const res = await getDataInvoices_Report(id);

  return {
    props: {
      data: {
        id,
        invoices: res,
      },
    },
  };


}






