import React, { FC } from "react";

const HeadHTML = `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <title></title>
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <style type="text/css">
    a {
        text-decoration: none;
    }
  </style>
  <!--[if mso]>
		<xml>
		<o:OfficeDocumentSettings>
			<o:AllowPNG/>
			<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
		</xml>

    <style type=“text/css”>
      @import url (http://fonts.googleapis.com/css?family=Inter:400,600,700) ;
    </style>

		<style type="text/css">
			.col, div.col { width:100% !important; max-width:100% !important; }
			.hidden-outlook, .hidden-outlook table { 
				display:none !important;
				mso-hide:all !important;
			}
		
			* {
				font-family: sans-serif !important;
				-ms-text-size-adjust: 100%;
			}

			img {
				-ms-interpolation-mode:bicubic;
			}

			td.body-content {
				width: 680px;
			}

			td.row-content {
				font-size:0;
			}
		</style>
	<![endif]-->
	<!--[if !mso]><!--> 
  <style type="text/css">
    .visible-outlook {
        display: none !important;
    }

    a[x-apple-data-detectors],
    .unstyle-auto-detected-links a {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
  </style>
  <!--<![endif]-->
	<!--[if !mso]><!-->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:400,600,700&amp;display=swap">
  <!--<![endif]-->
	<!--[if mso]><style type="text/css">.ms-t1{line-height:1.45;font-family:Inter,sans-serif;color:#212529;font-size:16px;text-align:left;font-weight:400}</style><![endif]-->
`;

export const Container: FC = ({ children }) => {
  return (
    <html>
      <head dangerouslySetInnerHTML={{ __html: HeadHTML }} />

      <body
        style={{
          margin: "0 auto",
          padding: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          background: "#ffffff",
        }}
      >
        <table
          role="presentation"
          cellSpacing="0"
          cellPadding="0"
          width="100%"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <tr>
              <td></td>
              <td
                className="body-content"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  color: "#212529",
                  fontWeight: "normal",
                  lineHeight: "1.45",
                  textAlign: "left",
                  WebkitTextSizeAdjust: "100%",
                  textSizeAdjust: "100%",
                }}
              >
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    maxWidth: "680px",
                    margin: "0 auto",
                  }}
                  className="ms-t1 container"
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                >
                  <tbody>
                    <tr>
                      <td
                        className="container-content"
                        style={{
                          padding: 0,
                          paddingTop: 40,
                          paddingBottom: 40,
                          verticalAlign: "top",
                          maxWidth: "680px",
                        }}
                      >
                        <center>{children}</center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
};
