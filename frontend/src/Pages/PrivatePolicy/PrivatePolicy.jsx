import React from 'react'

function PrivatePolicy() {
  return (
    <div className="policy-page" style={{width: "80%", margin: "auto"}}>
        <div>
            <strong>
                <span style={{fontSize: "26px"}}>
                    <span data-custom-class="title">
                        <bdt className="block-component"></bdt>
                        <bdt className="question">PRIVACY POLICY</bdt>
                        <bdt className="statement-end-if-in-editor"></bdt>
                    </span>
                </span>
            </strong>
            {/* <h2>Hello World</h2> */}
        </div>
        <div><span style={{color: "rgb(127, 127, 127)"}}><strong><span style={{fontSize:"15px"}}><span data-custom-class="subtitle">Last updated <bdt className="question">September 11, 2023</bdt></span></span></strong></span></div>
    </div>
  )
}

export default PrivatePolicy