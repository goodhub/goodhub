import { FC } from 'react';

const policy = `
<div><strong><span style="font-size: 26px;"><span data-custom-class="title">PRIVACY NOTICE</span></span></strong>
</div>
<div style="margin-bottom: 20px;"><span style="color: rgb(127, 127, 127);"><strong><span style="font-size: 15px;"><span
          data-custom-class="subtitle">Last updated <bdt class="question">March 09, 2022</bdt>
        </span></span></strong></span></div>
<div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span
      style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text">This privacy notice for
        <bdt class="question">GOODHUB</bdt><span style="color: rgb(89, 89, 89);"><span
            data-custom-class="body_text">
            <bdt class="block-component"></bdt>
          </span></span> ("<span style="color: rgb(89, 89, 89);"><span data-custom-class="body_text">
            <bdt class="block-component"></bdt>
          </span></span><strong>Charity</strong>
      </span><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89);"><span
            data-custom-class="body_text"><span style="color: rgb(89, 89, 89);"><span data-custom-class="body_text">
                <bdt class="statement-end-if-in-editor"><span data-custom-class="body_text"></span></bdt>
              </span></span></span></span></span><span data-custom-class="body_text">," "<strong>we</strong>,"
        "<strong>us</strong>," or "<strong>our</strong>"), describes how and why we might collect, store, use,
        and/or share ("<strong>process</strong>") your information when you use our services
        ("<strong>Services</strong>"), such as when you:</span></span></span><span style="font-size: 15px;"><span
      style="color: rgb(127, 127, 127);"><span data-custom-class="body_text"><span
          style="color: rgb(89, 89, 89);"><span data-custom-class="body_text">
            <bdt class="block-component"></bdt>
          </span></span></span></span></span></div>
<ul>
  <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">Visit our website<bdt
            class="block-component"></bdt> at <bdt class="question">goodhub.org.uk</bdt><span
            style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
                  style="font-size: 15px;"><span style="color: rgb(89, 89, 89);">
                    <bdt class="statement-end-if-in-editor">, or any website of ours that links to this privacy
                      notice</bdt>
                  </span></span></span></span></span></span></span></span></li>
  <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">Engage with us in
          other related ways ― including any sales, marketing, or events<span style="font-size: 15px;"><span
              style="color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
                  style="font-size: 15px;"><span style="color: rgb(89, 89, 89);">
                    <bdt class="statement-end-if-in-editor"></bdt>
                  </span></span></span></span></span></span></span></span></li>
</ul>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span style="color: rgb(127, 127, 127);"><span
        data-custom-class="body_text"><strong>Questions or concerns?&nbsp;</strong>Reading this privacy notice
        will help you understand your privacy rights and choices. If you do not agree with our policies and
        practices, please do not use our Services. If you still have any questions or concerns, please contact us
        at <bdt class="question">info@goodhub.org.uk</bdt>.</span></span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><strong><span style="font-size: 15px;"><span data-custom-class="heading_1">SUMMARY
        OF KEY POINTS</span></span></strong></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong><em>This
          summary provides key points from our privacy notice, but you can find out more details about any of
          these topics by clicking the link following each key point or by using our table of contents below to
          find the section you are looking for. You can also click&nbsp;</em></strong></span></span><a
    data-custom-class="link" href="#toc"><span style="font-size: 15px;"><span
        data-custom-class="body_text"><strong><em>here</em></strong></span></span></a><span
    style="font-size: 15px;"><span data-custom-class="body_text"><strong><em>&nbsp;to go directly to our table of
          contents.</em></strong></span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>What
        personal information do we process?</strong> When you visit, use, or navigate our Services, we may process
      personal information depending on how you interact with <bdt class="block-component"></bdt>
      <bdt class="question">GOODHUB</bdt>
      <bdt class="statement-end-if-in-editor"></bdt> and the Services, the choices you make, and the products and
      features you use. Click&nbsp;
    </span></span><a data-custom-class="link" href="#personalinfo"><span style="font-size: 15px;"><span
        data-custom-class="body_text">here</span></span></a><span style="font-size: 15px;"><span
      data-custom-class="body_text">&nbsp;to learn more.</span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>Do we
        process any sensitive personal information?</strong>
      <bdt class="block-component"></bdt>We do not process sensitive personal information.<bdt class="else-block">
      </bdt>
    </span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>Do you
        receive any information from third parties?</strong>
      <bdt class="block-component"></bdt>We do not receive any information from third parties.<bdt
        class="else-block"></bdt>
    </span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>How do
        you process my information?</strong> We process your information to provide, improve, and administer our
      Services, communicate with you, for security and fraud prevention, and to comply with law. We may also
      process your information for other purposes with your consent. We process your information only when we have
      a valid legal reason to do so. Click&nbsp;</span></span><a data-custom-class="link" href="#infouse"><span
      style="font-size: 15px;"><span data-custom-class="body_text">here</span></span></a><span
    style="font-size: 15px;"><span data-custom-class="body_text">&nbsp;to learn more.</span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>In what
        situations and with which <bdt class="block-component"></bdt>parties do we share personal
        information?</strong> We do not share personal information with third parties.</span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>How do
        we keep your information safe?</strong> We have organizational and technical processes and procedures in
      place to protect your personal information. However, no electronic transmission over the internet or
      information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that
      hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and
      improperly collect, access, steal, or modify your information. Click&nbsp;</span></span><a
    data-custom-class="link" href="#infosafe"><span style="font-size: 15px;"><span
        data-custom-class="body_text">here</span></span></a><span style="font-size: 15px;"><span
      data-custom-class="body_text">&nbsp;to learn more.<bdt class="statement-end-if-in-editor"></bdt>
    </span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>What are
        your rights?</strong> Depending on where you are located geographically, the applicable privacy law may
      mean you have certain rights regarding your personal information. Click&nbsp;</span></span><a
    data-custom-class="link" href="#privacyrights"><span style="font-size: 15px;"><span
        data-custom-class="body_text">here</span></span></a><span style="font-size: 15px;"><span
      data-custom-class="body_text">&nbsp;to learn more.</span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>How do I
        exercise my rights?</strong> The easiest way to exercise your rights is by by contacting us at
      info@goodhub.org.uk. We will consider and act upon any request in
      accordance with applicable data protection laws.
    </span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">Want to learn
      more about what <bdt class="block-component"></bdt>
      <bdt class="question">GOODHUB</bdt>
      <bdt class="statement-end-if-in-editor"></bdt> does with any information we collect? Click&nbsp;
    </span></span><a data-custom-class="link" href="#toc"><span style="font-size: 15px;"><span
        data-custom-class="body_text">here</span></span></a><span style="font-size: 15px;"><span
      data-custom-class="body_text">&nbsp;to review the notice in full.</span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><br></div>
<div id="toc" style="line-height: 1.5;"><span style="font-size: 15px;"><span
      style="color: rgb(127, 127, 127);"><span style="color: rgb(0, 0, 0);"><strong><span
            data-custom-class="heading_1">TABLE OF CONTENTS</span></strong></span></span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#infocollect"><span
        style="color: rgb(89, 89, 89);">1. WHAT INFORMATION DO WE
        COLLECT?</span></a></span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#infouse"><span
        style="color: rgb(89, 89, 89);">2. HOW DO WE PROCESS YOUR INFORMATION?<bdt class="block-component"></bdt>
      </span></a></span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#legalbases"><span
        style="color: rgb(89, 89, 89);">3. <span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);">WHAT
            LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL
            INFORMATION?</span></span>
        <bdt class="statement-end-if-in-editor"></bdt>
      </span></a></span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><a
        data-custom-class="link" href="#whoshare">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL
        INFORMATION?</a></span><span data-custom-class="body_text">
      <bdt class="block-component"></bdt>
    </span><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89);"><span
          data-custom-class="body_text"><span style="color: rgb(89, 89, 89);">
            <bdt class="block-component"></bdt>
          </span></span></span></span></span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#cookies"><span
        style="color: rgb(89, 89, 89);">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</span></a><span
      style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89);"><span
          data-custom-class="body_text"><span style="color: rgb(89, 89, 89);">
            <bdt class="statement-end-if-in-editor"></bdt>
          </span></span><span data-custom-class="body_text"><span style="color: rgb(89, 89, 89);"><span
              style="color: rgb(89, 89, 89);"><span style="color: rgb(89, 89, 89);">
                <bdt class="block-component"></bdt>
              </span></span>
            <bdt class="block-component"></bdt>
          </span></span></span></span></span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#inforetain"><span
        style="color: rgb(89, 89, 89);">6. HOW LONG DO WE KEEP YOUR INFORMATION?</span></a><span
      style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89);"><span
          data-custom-class="body_text"><span style="color: rgb(89, 89, 89);"><span style="color: rgb(89, 89, 89);">
              <bdt class="block-component"></bdt>
            </span></span></span></span></span></span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#infosafe"><span
        style="color: rgb(89, 89, 89);">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</span></a><span
      style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89);"><span
          data-custom-class="body_text"><span style="color: rgb(89, 89, 89);">
            <bdt class="statement-end-if-in-editor"></bdt>
            <bdt class="block-component"></bdt>
          </span></span></span></span></span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#infominors"><span
        style="color: rgb(89, 89, 89);">8. DO WE COLLECT INFORMATION FROM MINORS?</span></a><span
      style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89);"><span
          data-custom-class="body_text"><span style="color: rgb(89, 89, 89);">
            <bdt class="statement-end-if-in-editor"></bdt>
          </span></span></span></span></span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><a
        data-custom-class="link" href="#privacyrights">9. WHAT ARE YOUR PRIVACY RIGHTS?</a></span></span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#DNT"><span
        style="color: rgb(89, 89, 89);">10. CONTROLS FOR DO-NOT-TRACK FEATURES</span></a></span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#caresidents"><span
        style="color: rgb(89, 89, 89);">11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY
        RIGHTS?</span></a></span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link"
      href="#policyupdates"><span style="color: rgb(89, 89, 89);">12. DO WE MAKE UPDATES TO THIS
        NOTICE?</span></a></span></div>
<div style="line-height: 1.5;"><a data-custom-class="link" href="#contact"><span
      style="color: rgb(89, 89, 89); font-size: 15px;">13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</span></a>
</div>
<div style="line-height: 1.5;"><a data-custom-class="link" href="#request"><span style="color: rgb(89, 89, 89);">14.
      HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
      YOU?</span></a></div>
<div style="line-height: 1.5;"><br></div>
<div id="infocollect" style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span
      style="color: rgb(89, 89, 89); font-size: 15px;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
          style="font-size: 15px; color: rgb(89, 89, 89);"><span id="control"
            style="color: rgb(0, 0, 0);"><strong><span data-custom-class="heading_1">1. WHAT INFORMATION DO WE
                COLLECT?</span></strong></span></span></span></span></span></div>
<div style="line-height: 1.5;"><br></div>
<div id="personalinfo" style="line-height: 1.5;"><span data-custom-class="heading_2"
    style="color: rgb(0, 0, 0);"><span style="font-size: 15px;"><strong>Personal information you disclose to
        us</strong></span></span></div>
<div>
  <div><br></div>
  <div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span
        style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><span
            style="font-size: 15px; color: rgb(89, 89, 89);"><span
              style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong><em>In
                    Short:</em></strong></span></span></span></span><span data-custom-class="body_text"><span
            style="font-size: 15px; color: rgb(89, 89, 89);"><span
              style="font-size: 15px; color: rgb(89, 89, 89);"><span
                data-custom-class="body_text"><strong><em>&nbsp;</em></strong><em>We collect personal information
                  that you provide to us.</em></span></span></span></span></span></span></div>
</div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">We collect personal
        information that you voluntarily provide to us when you <span style="font-size: 15px;">
          <bdt class="block-component"></bdt>
        </span>register on the Services,&nbsp;</span><span style="font-size: 15px;"><span
          data-custom-class="body_text"><span style="font-size: 15px;">
            <bdt class="statement-end-if-in-editor"></bdt>
          </span></span><span data-custom-class="body_text">express an interest in obtaining information about us
          or our products and Services, when you participate in activities on the Services, or otherwise when you
          contact us.</span></span></span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
          style="font-size: 15px;">
          <bdt class="block-component"></bdt>
        </span></span></span></span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong>Personal
          Information Provided by You.</strong> The personal information that we collect depends on the context of
        your interactions with us and the Services, the choices you make, and the products and features you use.
        The personal information we collect may include the following:<span style="font-size: 15px;"><span
            data-custom-class="body_text">
            <bdt class="forloop-component"></bdt>
          </span></span></span></span></span></div>
<ul>
  <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
            style="font-size: 15px;"><span data-custom-class="body_text">
              <bdt class="question">names</bdt>
            </span></span></span></span></span></li>
</ul>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
          style="font-size: 15px;"><span data-custom-class="body_text">
            <bdt class="forloop-component"></bdt>
          </span></span></span></span></span></div>
<ul>
  <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
            style="font-size: 15px;"><span data-custom-class="body_text">
              <bdt class="question">phone numbers</bdt>
            </span></span></span></span></span></li>
</ul>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
          style="font-size: 15px;"><span data-custom-class="body_text">
            <bdt class="forloop-component"></bdt>
          </span></span></span></span></span></div>
<ul>
  <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
            style="font-size: 15px;"><span data-custom-class="body_text">
              <bdt class="question">email addresses</bdt>
            </span></span></span></span></span></li>
</ul>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
          style="font-size: 15px;"><span data-custom-class="body_text">
            <bdt class="forloop-component"></bdt>
          </span></span></span></span></span></div>
<ul>
  <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
            style="font-size: 15px;"><span data-custom-class="body_text">
              <bdt class="question">usernames</bdt>
            </span></span></span></span></span></li>
</ul>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
          style="font-size: 15px;"><span data-custom-class="body_text">
            <bdt class="forloop-component"></bdt>
          </span></span></span></span></span></div>
<ul>
  <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
            style="font-size: 15px;"><span data-custom-class="body_text">
              <bdt class="question">passwords</bdt>
            </span></span></span></span></span></li>
</ul>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
          style="font-size: 15px;"><span data-custom-class="body_text">
            <bdt class="forloop-component"></bdt>
          </span></span></span></span></span></div>
<ul>
  <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
            style="font-size: 15px;"><span data-custom-class="body_text">
              <bdt class="question">contact preferences</bdt>
            </span></span></span></span></span></li>
</ul>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
          style="font-size: 15px;"><span data-custom-class="body_text">
            <bdt class="forloop-component"></bdt>
          </span><span data-custom-class="body_text">
            <bdt class="statement-end-if-in-editor"></bdt>
          </span></span></span></span></span></div>
<div id="sensitiveinfo" style="line-height: 1.5;"><span style="font-size: 15px;"><span
      data-custom-class="body_text"><strong>Sensitive Information.</strong>
      <bdt class="block-component"></bdt>We do not process sensitive information.
    </span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">
      <bdt class="else-block"></bdt>
    </span></span><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
          style="font-size: 15px;"><span data-custom-class="body_text">
            <bdt class="block-component">
              <bdt class="block-component"></bdt>
            </bdt>
          </span></span></span></span>
    <bdt class="block-component"></bdt>
  </span></div>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">All personal
        information that you provide to us must be true, complete, and accurate, and you must notify us of any
        changes to such personal information.</span></span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">
        <bdt class="block-component"></bdt>
      </span></span></span></div>
<div style="line-height: 1.5;"><span data-custom-class="heading_2" style="color: rgb(0, 0, 0);"><span
      style="font-size: 15px;"><strong>Information automatically collected</strong></span></span></div>
<div>
  <div><br></div>
  <div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span
        style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><span
            style="font-size: 15px; color: rgb(89, 89, 89);"><span
              style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong><em>In
                    Short:</em></strong></span></span></span></span><span data-custom-class="body_text"><span
            style="font-size: 15px; color: rgb(89, 89, 89);"><span
              style="font-size: 15px; color: rgb(89, 89, 89);"><span
                data-custom-class="body_text"><strong><em>&nbsp;</em></strong><em>Some information — such as your
                  Internet Protocol (IP) address and/or browser and device characteristics — is collected
                  automatically when you visit our Services.</em></span></span></span></span></span></span></div>
</div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">We automatically
        collect certain information when you visit, use, or navigate the Services. This information does not
        reveal your specific identity (like your name or contact information) but may include device and usage
        information, such as your IP address, browser and device characteristics, operating system, language
        preferences, referring URLs, device name, country, location, information about how and when you use our
        Services, and other technical information. This information is primarily needed to maintain the security
        and operation of our Services, and for our internal analytics and reporting purposes.<bdt
          class="block-component"></bdt></span></span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">Like many businesses,
        we also collect information through cookies and similar technologies. <bdt class="block-component"></bdt>
        <bdt class="block-component"></bdt>
        <bdt class="statement-end-if-in-editor"><span data-custom-class="body_text"></span></bdt>
        <bdt class="block-component"></bdt>
      </span></span></span></div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">The information we
        collect includes:<bdt class="block-component"></bdt></span></span></span></div>
<ul>
  <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><em>Log and Usage
            Data.</em> Log and usage data is service-related, diagnostic, usage, and performance information our
          servers automatically collect when you access or use our Services and which we record in log files.
          Depending on how you interact with us, this log data may include your IP address, device information,
          browser type, and settings and information about your activity in the Services<span
            style="font-size: 15px;">&nbsp;</span>(such as the date/time stamps associated with your usage, pages
          and files viewed, searches, and other actions you take such as which features you use), device event
          information (such as system activity, error reports (sometimes called "crash dumps"), and hardware
          settings).<span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><span
                data-custom-class="body_text"><span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);">
                    <bdt class="statement-end-if-in-editor"></bdt>
                  </span></span></span></span></span></span></span></span></li>
</ul>
<div style="line-height: 1.5;">
  <bdt class="block-component"><span style="font-size: 15px;"><span data-custom-class="body_text"></span></span>
  </bdt>
</div>
<ul>
  <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><em>Device Data.</em>
          We collect device data such as information about your computer, phone, tablet, or other device you use
          to access the Services. Depending on the device used, this device data may include information such as
          your IP address (or proxy server), device and application identification numbers, location, browser
          type, hardware model, Internet service provider and/or mobile carrier, operating system, and system
          configuration information.<span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><span
                data-custom-class="body_text"><span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);">
                    <bdt class="statement-end-if-in-editor"></bdt>
                  </span></span></span></span></span></span></span></span></li>
</ul>
<div style="line-height: 1.5;">
  <bdt class="block-component"><span style="font-size: 15px;"><span data-custom-class="body_text"></span></span>
  </bdt>
</div>
<ul>
  <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><em>Location
            Data.</em> We collect location data such as information about your device's location, which can be
          either precise or imprecise. How much information we collect depends on the type and settings of the
          device you use to access the Services. For example, we may use GPS and other technologies to collect
          geolocation data that tells us your current location (based on your IP address). You can opt out of
          allowing us to collect this information either by refusing access to the information or by disabling
          your Location setting on your device. However, if you choose to opt out, you may not be able to use
          certain aspects of the Services.<span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><span
                data-custom-class="body_text"><span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);">
                    <bdt class="statement-end-if-in-editor"></bdt>
                  </span></span></span></span></span></span></span></span></li>
</ul>
<div>
  <bdt class="block-component"><span style="font-size: 15px;"></span></bdt>
  <bdt class="statement-end-if-in-editor"></bdt><span data-custom-class="body_text"><span
      style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><span
          style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text">
            <bdt class="statement-end-if-in-editor">
              <bdt class="block-component"></bdt>
            </bdt>
          </span></span></span></span></span><span style="font-size: 15px;"><span data-custom-class="body_text">
      <bdt class="block-component"></bdt>
    </span></span>
</div>
<div id="infouse" style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span
      style="color: rgb(89, 89, 89); font-size: 15px;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
          style="font-size: 15px; color: rgb(89, 89, 89);"><span id="control"
            style="color: rgb(0, 0, 0);"><strong><span data-custom-class="heading_1">2. HOW DO WE PROCESS YOUR
                INFORMATION?</span></strong></span></span></span></span></span></div>
<div>
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span
        style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><span
            style="font-size: 15px; color: rgb(89, 89, 89);"><span
              style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong><em>In
                    Short:&nbsp;</em></strong><em>We process your information to provide, improve, and administer
                  our Services, communicate with you, for security and fraud prevention, and to comply with law.
                  We may also process your information for other purposes with your
                  consent.</em></span></span></span></span></span></span></div>
</div>
<div style="line-height: 1.5;"><br></div>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong>We process your
          personal information for a variety of reasons, depending on how you interact with our Services,
          including:</strong>
        <bdt class="block-component"></bdt>
      </span></span></span></div>
<ul>
  <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong>To facilitate
            account creation and authentication and otherwise manage user accounts.&nbsp;</strong>We may process
          your information so you can create and log in to your account, as well as keep your account in working
          order.<span style="font-size: 15px; color: rgb(89, 89, 89);"><span
              style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
                  style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><span
                      data-custom-class="body_text"><span style="font-size: 15px;"><span
                          style="color: rgb(89, 89, 89);"><span data-custom-class="body_text">
                            <bdt class="statement-end-if-in-editor"></bdt>
                          </span></span></span></span></span></span></span></span></span></span></span></span>
  </li>
</ul>
<div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">
        <bdt class="block-component"></bdt>
      </span></span></span>
  <div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">
          <bdt class="block-component"></bdt>
        </span></span></span></div>
  <ul>
    <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
          style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong>To deliver
              and facilitate delivery of services to the user.&nbsp;</strong>We may process your information to
            provide you with the requested service.<span style="font-size: 15px;"><span
                style="color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
                    style="font-size: 15px; color: rgb(89, 89, 89);"><span
                      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
                          style="font-size: 15px; color: rgb(89, 89, 89);"><span
                            style="font-size: 15px; color: rgb(89, 89, 89);"><span
                              data-custom-class="body_text"><span
                                style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                  style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                    data-custom-class="body_text"><span style="font-size: 15px;"><span
                                        style="color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
                                            style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><span
                                                data-custom-class="body_text">
                                                <bdt class="statement-end-if-in-editor"></bdt>
                                              </span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>
    </li>
  </ul>
  <div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
        style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">
          <bdt class="block-component"></bdt>
        </span></span></span>
    <div style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
          style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">
            <bdt class="block-component"></bdt>
          </span></span></span></div>
    <ul>
      <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
            style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong>To
                respond to user inquiries/offer support to users.&nbsp;</strong>We may process your information to
              respond to your inquiries and solve any potential issues you might have with the requested service.
              <bdt class="statement-end-if-in-editor"></bdt>
            </span></span></span></li>
    </ul>
    <div style="line-height: 1.5;">
      <bdt class="block-component"><span style="font-size: 15px;"></span></bdt>
      <div style="line-height: 1.5;">
        <bdt class="block-component"><span style="font-size: 15px;"></span></bdt>
      </div>
      <ul>
        <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
              style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong>To send
                  administrative information to you.&nbsp;</strong>We may process your information to send you
                details about our products and services, changes to our terms and policies, and other similar
                information.<span style="font-size: 15px; color: rgb(89, 89, 89);"><span
                    style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><span
                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                          style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">
                            <bdt class="statement-end-if-in-editor"></bdt>
                          </span></span></span></span></span></span></span></span></span></li>
      </ul>
      <div style="line-height: 1.5;">
        <bdt class="block-component"><span style="font-size: 15px;"></span></bdt>
        <div style="line-height: 1.5;">
          <bdt class="block-component"><span style="font-size: 15px;"><span
                data-custom-class="body_text"></span></span></bdt>
          <p style="font-size: 15px; line-height: 1.5;">
            <bdt class="block-component"><span style="font-size: 15px;"></span></bdt>
          </p>
          <p style="font-size: 15px; line-height: 1.5;">
            <bdt class="block-component"><span style="font-size: 15px;"></span></bdt>
          </p>
          <ul>
            <li style="line-height: 1.5;"><span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><span
                    style="color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong>To enable
                        user-to-user
                        communications.&nbsp;</strong>We may process your information if you choose to use any of
                      our offerings that allow for communication with another user.<span
                        style="color: rgb(89, 89, 89);"><span style="color: rgb(89, 89, 89);"><span
                            data-custom-class="body_text"><span style="color: rgb(89, 89, 89);"><span
                                data-custom-class="body_text"><span style="color: rgb(89, 89, 89);"><span
                                    data-custom-class="body_text">
                                    <bdt class="statement-end-if-in-editor"></bdt>
                                  </span></span></span></span></span></span></span></span></span></span></span>
            </li>
          </ul>
          <p style="font-size: 15px; line-height: 1.5;">
            <bdt class="block-component"></bdt>
          </p>
          <p style="font-size: 15px; line-height: 1.5;">
            <bdt class="block-component"></bdt>
          </p>
          <ul>
            <li style="line-height: 1.5;"><span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><span
                    style="color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong>To request
                        feedback.&nbsp;</strong>We may process your
                      information when necessary to request feedback and to contact you about your use of our
                      Services.<span style="color: rgb(89, 89, 89);"><span style="color: rgb(89, 89, 89);"><span
                            data-custom-class="body_text"><span style="color: rgb(89, 89, 89);"><span
                                data-custom-class="body_text"><span style="color: rgb(89, 89, 89);"><span
                                    data-custom-class="body_text">
                                    <bdt class="statement-end-if-in-editor"></bdt>
                                  </span></span></span></span></span></span></span></span></span></span></span>
            </li>
          </ul>
          <div style="line-height: 1.5;">
            <bdt class="block-component"><span style="font-size: 15px;"></span></bdt>
            <div style="line-height: 1.5;">
              <bdt class="block-component"><span style="font-size: 15px;"></span></bdt>
            </div>
            <ul>
              <li style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span
                    style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text"><strong>To
                        send you marketing and promotional
                        communications.&nbsp;</strong>We may process the personal information you send to us for
                      our marketing purposes, if this is in accordance with your marketing preferences. You can
                      opt out of our marketing emails at any time. For more information, see
                      "</span></span></span><a data-custom-class="link" href="#privacyrights"><span
                    style="font-size: 15px; color: rgb(89, 89, 89);"><span
                      style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">WHAT
                        ARE YOUR PRIVACY RIGHTS?</span></span></span></a><span
                  style="font-size: 15px; color: rgb(89, 89, 89);"><span
                    style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">"
                      below).</span><span data-custom-class="body_text">
                      <bdt class="statement-end-if-in-editor"></bdt>
                    </span></span></span></li>
            </ul>
            <div style="line-height: 1.5;">
              <bdt class="block-component"><span style="font-size: 15px;"></span></bdt>
              <div style="line-height: 1.5;"><span style="font-size: 15px;">
                  <bdt class="block-component"><span data-custom-class="body_text"></span></bdt>
                </span>
                <div style="line-height: 1.5;">
                  <bdt class="block-component"><span style="font-size: 15px;"><span
                        data-custom-class="body_text"></span></span></bdt>
                  <div style="line-height: 1.5;">
                    <bdt class="block-component"><span style="font-size: 15px;"><span
                          data-custom-class="body_text"></span></span></bdt>
                    <div style="line-height: 1.5;">
                      <bdt class="block-component"><span style="font-size: 15px;"><span
                            data-custom-class="body_text"></span></span></bdt>
                      <div style="line-height: 1.5;">
                        <bdt class="block-component"><span style="font-size: 15px;"><span
                              data-custom-class="body_text"></span></span></bdt>
                        <div style="line-height: 1.5;">
                          <bdt class="block-component"><span style="font-size: 15px;"><span
                                data-custom-class="body_text"></span></span></bdt>
                          <div style="line-height: 1.5;">
                            <bdt class="block-component"><span style="font-size: 15px;"><span
                                  data-custom-class="body_text"></span></span></bdt>
                            <div style="line-height: 1.5;">
                              <bdt class="block-component"><span style="font-size: 15px;"><span
                                    data-custom-class="body_text"></span></span></bdt>
                            </div>
                            <ul>
                              <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                    style="font-size: 15px;"><strong>To identify usage trends.</strong> We may
                                    process information about how you use our Services to better understand how
                                    they are being used so we can improve them.</span></span>
                                <bdt class="statement-end-if-in-editor"><span style="font-size: 15px;"><span
                                      data-custom-class="body_text"></span></span></bdt>
                              </li>
                            </ul>
                            <div style="line-height: 1.5;">
                              <bdt class="block-component"><span style="font-size: 15px;"><span
                                    data-custom-class="body_text"></span></span></bdt>
                              <div style="line-height: 1.5;">
                                <bdt class="block-component"><span style="font-size: 15px;"><span
                                      data-custom-class="body_text"></span></span></bdt>
                                <div style="line-height: 1.5;">
                                  <bdt class="block-component"><span style="font-size: 15px;"><span
                                        data-custom-class="body_text"></span></span></bdt>
                                  <div style="line-height: 1.5;">
                                    <bdt class="block-component"><span style="font-size: 15px;"><span
                                          data-custom-class="body_text"></span></span></bdt>
                                  </div>
                                  <ul>
                                    <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                          style="font-size: 15px;"><strong>To save or protect an individual's
                                            vital interest.</strong> We may process your information when
                                          necessary to save or protect an individual’s vital interest, such as to
                                          prevent harm.</span></span>
                                      <bdt class="statement-end-if-in-editor"><span style="font-size: 15px;"><span
                                            data-custom-class="body_text"></span></span></bdt>
                                    </li>
                                  </ul>
                                  <div style="line-height: 1.5;">
                                    <bdt class="block-component"><span style="font-size: 15px;"><span
                                          data-custom-class="body_text"></span></span></bdt>
                                    <bdt class="block-component"><span style="font-size: 15px;"><span
                                          data-custom-class="body_text"></span></span></bdt>
                                    <bdt class="block-component"><span style="font-size: 15px;"><span
                                          data-custom-class="body_text"></span></span></bdt>
                                    <bdt class="block-component"><span style="font-size: 15px;"><span
                                          data-custom-class="body_text"></span></span></bdt>
                                  </div>
                                  <div style="line-height: 1.5;"><br></div>
                                  <div id="legalbases" style="line-height: 1.5;"><strong><span
                                        style="font-size: 15px;"><span data-custom-class="heading_1">3. WHAT LEGAL
                                          BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</span></span></strong>
                                  </div>
                                  <div style="line-height: 1.5;"><br></div>
                                  <div style="line-height: 1.5;"><em><span style="font-size: 15px;"><span
                                          data-custom-class="body_text"><strong>In Short:&nbsp;</strong>We only
                                          process your personal information when we believe it is necessary and we
                                          have a valid legal reason (i.e., legal basis) to do so under applicable
                                          law, like with your consent, to comply with laws, to provide you with
                                          services to enter into or fulfill our contractual obligations, to
                                          protect your rights, or to fulfill our legitimate business
                                          interests.</span></span></em><span style="font-size: 15px;"><span
                                        data-custom-class="body_text">
                                        <bdt class="block-component"></bdt>
                                      </span><span data-custom-class="body_text">
                                        <bdt class="block-component"></bdt>
                                      </span></span></div>
                                  <div style="line-height: 1.5;"><br></div>
                                  <div style="line-height: 1.5;"><em><span style="font-size: 15px;"><span
                                          data-custom-class="body_text"><strong><u>If you are located in the EU or
                                              UK, this section applies to
                                              you.</u></strong></span></span></em><span
                                      style="font-size: 15px;"><span data-custom-class="body_text">
                                        <bdt class="statement-end-if-in-editor"></bdt>
                                      </span></span></div>
                                  <div style="line-height: 1.5;"><br></div>
                                  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span
                                        data-custom-class="body_text">The General Data Protection Regulation
                                        (GDPR) and UK GDPR require us to explain the valid legal bases we rely on
                                        in order to process your personal information. As such, we may rely on the
                                        following legal bases to process your personal information:</span></span>
                                  </div>
                                  <ul>
                                    <li style="line-height: 1.5;"><span style="font-size: 15px;"><span
                                          data-custom-class="body_text"><strong>Consent.&nbsp;</strong>We may
                                          process your information if you have given us permission (i.e., consent)
                                          to use your personal information for a specific purpose. You can
                                          withdraw your consent at any time. Click&nbsp;</span></span><a
                                        data-custom-class="link" href="#withdrawconsent"><span
                                          style="font-size: 15px;"><span
                                            data-custom-class="body_text">here</span></span></a><span
                                        style="font-size: 15px;"><span data-custom-class="body_text">&nbsp;to
                                          learn more.</span></span></li>
                                  </ul>
                                  <div style="line-height: 1.5;">
                                    <bdt class="block-component"><span style="font-size: 15px;"><span
                                          data-custom-class="body_text"></span></span></bdt>
                                  </div>
                                  <ul>
                                    <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                          style="font-size: 15px;"><strong>Performance of a Contract.</strong> We
                                          may process your personal information when we believe it is necessary to
                                          fulfill our contractual obligations to you, including providing our
                                          Services or at your request prior to entering into a contract with
                                          you.</span></span>
                                      <bdt class="statement-end-if-in-editor"><span style="font-size: 15px;"><span
                                            data-custom-class="body_text"></span></span></bdt>
                                    </li>
                                  </ul>
                                  <div style="line-height: 1.5;">
                                    <bdt class="block-component"><span style="font-size: 15px;"><span
                                          data-custom-class="body_text"></span></span></bdt>
                                  </div>
                                  <ul>
                                    <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                          style="font-size: 15px;"><strong>Legitimate Interests.</strong> We may
                                          process your information when we believe it is reasonably necessary to
                                          achieve our legitimate business interests and those interests do not
                                          outweigh your interests and fundamental rights and freedoms. For
                                          example, we may process your personal information for some of the
                                          purposes described in order to:</span></span></li>
                                  </ul>
                                  <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                        style="font-size: 15px;">
                                        <bdt class="block-component"></bdt>
                                      </span></span></div>
                                  <ul style="margin-left: 40px;">
                                    <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                          style="font-size: 15px;">Send users information about special offers and
                                          discounts on our products and services<bdt
                                            class="statement-end-if-in-editor"></bdt></span></span></li>
                                  </ul>
                                  <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                        style="font-size: 15px;">
                                        <bdt class="block-component"></bdt>
                                      </span></span>
                                    <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                          style="font-size: 15px;">
                                          <bdt class="block-component"></bdt>
                                        </span></span></div>
                                    <ul style="margin-left: 40px;">
                                      <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                            style="font-size: 15px;">Analyze how our services are used so we can
                                            improve them to engage and retain users<bdt
                                              class="statement-end-if-in-editor"></bdt></span></span></li>
                                    </ul>
                                    <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                          style="font-size: 15px;">
                                          <bdt class="block-component"></bdt>
                                        </span></span>
                                      <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                            style="font-size: 15px;">
                                            <bdt class="block-component"></bdt>
                                          </span></span>
                                        <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                              style="font-size: 15px;">
                                              <bdt class="block-component"></bdt>
                                            </span></span></div>
                                        <ul style="margin-left: 40px;">
                                          <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                                style="font-size: 15px;">Understand how our users use our products
                                                and services so we can improve user experience<bdt
                                                  class="statement-end-if-in-editor"></bdt></span></span></li>
                                        </ul>
                                        <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                              style="font-size: 15px;">
                                              <bdt class="block-component"></bdt>
                                            </span></span>
                                          <bdt class="statement-end-if-in-editor"><span
                                              style="font-size: 15px;"><span
                                                data-custom-class="body_text"></span></span></bdt>
                                          <bdt class="block-component"><span style="font-size: 15px;"><span
                                                data-custom-class="body_text"></span></span></bdt>
                                        </div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                                style="font-size: 15px;"><strong>Legal Obligations.</strong> We
                                                may process your information where we believe it is necessary for
                                                compliance with our legal obligations, such as to cooperate with a
                                                law enforcement body or regulatory agency, exercise or defend our
                                                legal rights, or disclose your information as evidence in
                                                litigation in which we are involved.<bdt
                                                  class="statement-end-if-in-editor"></bdt><br></span></span></li>
                                        </ul>
                                        <div style="line-height: 1.5;">
                                          <bdt class="block-component"><span style="font-size: 15px;"><span
                                                data-custom-class="body_text"></span></span></bdt>
                                        </div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                                style="font-size: 15px;"><strong>Vital Interests.</strong> We may
                                                process your information where we believe it is necessary to
                                                protect your vital interests or the vital interests of a third
                                                party, such as situations involving potential threats to the
                                                safety of any person.</span></span>
                                            <bdt class="statement-end-if-in-editor"><span
                                                style="font-size: 15px;"><span
                                                  data-custom-class="body_text"></span></span></bdt>
                                          </li>
                                        </ul>
                                        <div style="line-height: 1.5;">
                                          <bdt class="block-component"><span style="font-size: 15px;"><span
                                                data-custom-class="body_text"></span></span></bdt>
                                          <bdt class="block-component"><span style="font-size: 15px;"><span
                                                data-custom-class="body_text"></span></span></bdt><span
                                            data-custom-class="body_text"><span style="font-size: 15px;">
                                              <bdt class="block-component"></bdt>
                                            </span></span>
                                        </div>
                                        <div style="line-height: 1.5;"><br></div>
                                        <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                              style="font-size: 15px;"><strong><u><em>If you are located in
                                                    Canada, this section applies to you.</em></u></strong>
                                              <bdt class="statement-end-if-in-editor"></bdt>
                                            </span></span></div>
                                        <div style="line-height: 1.5;"><br></div>
                                        <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                              style="font-size: 15px;">We may process your information if you have
                                              given us specific permission (i.e., express consent) to use your
                                              personal information for a specific purpose, or in situations where
                                              your permission can be inferred (i.e., implied consent). You can
                                              withdraw your consent at any time. Click&nbsp;</span></span><a
                                            data-custom-class="link" href="#withdrawconsent"><span
                                              data-custom-class="body_text"><span
                                                style="font-size: 15px;">here</span></span></a><span
                                            data-custom-class="body_text"><span style="font-size: 15px;">&nbsp;to
                                              learn more.</span></span></div>
                                        <div style="line-height: 1.5;"><br></div>
                                        <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                              style="font-size: 15px;">In some exceptional cases, we may be
                                              legally permitted under applicable law to process your information
                                              without your consent, including, for example:</span></span></div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                                style="font-size: 15px;">If collection is clearly in the interests
                                                of an individual and consent cannot be obtained in a timely
                                                way</span></span></li>
                                        </ul>
                                        <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                              style="font-size: 15px;">
                                              <bdt class="block-component"></bdt>
                                            </span></span></div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                                style="font-size: 15px;">For investigations and fraud detection
                                                and prevention<bdt class="statement-end-if-in-editor"></bdt>
                                              </span></span></li>
                                        </ul>
                                        <div style="line-height: 1.5;">
                                          <bdt class="block-component"><span style="font-size: 15px;"><span
                                                data-custom-class="body_text"></span></span></bdt>
                                        </div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                                style="font-size: 15px;">For business transactions provided
                                                certain conditions are met</span></span>
                                            <bdt class="statement-end-if-in-editor"><span
                                                style="font-size: 15px;"><span
                                                  data-custom-class="body_text"></span></span></bdt>
                                          </li>
                                        </ul>
                                        <div style="line-height: 1.5;">
                                          <bdt class="block-component"><span style="font-size: 15px;"><span
                                                data-custom-class="body_text"></span></span></bdt>
                                        </div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                                style="font-size: 15px;">If it is contained in a witness statement
                                                and the collection is necessary to assess, process, or settle an
                                                insurance claim</span></span>
                                            <bdt class="statement-end-if-in-editor"><span
                                                style="font-size: 15px;"><span
                                                  data-custom-class="body_text"></span></span></bdt>
                                          </li>
                                        </ul>
                                        <div style="line-height: 1.5;">
                                          <bdt class="block-component"><span style="font-size: 15px;"><span
                                                data-custom-class="body_text"></span></span></bdt>
                                        </div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                                style="font-size: 15px;">For identifying injured, ill, or deceased
                                                persons and communicating with next of kin</span></span>
                                            <bdt class="statement-end-if-in-editor"><span
                                                style="font-size: 15px;"><span
                                                  data-custom-class="body_text"></span></span></bdt>
                                          </li>
                                        </ul>
                                        <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                              style="font-size: 15px;">
                                              <bdt class="block-component"></bdt>
                                            </span></span></div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                                style="font-size: 15px;">If we have reasonable grounds to believe
                                                an individual has been, is, or may be victim of financial abuse
                                                <bdt class="statement-end-if-in-editor"></bdt>
                                              </span></span></li>
                                        </ul>
                                        <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                              style="font-size: 15px;">
                                              <bdt class="block-component"></bdt>
                                            </span></span></div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                                style="font-size: 15px;">If it is reasonable to expect collection
                                                and use with consent would compromise the availability or the
                                                accuracy of the information and the collection is reasonable for
                                                purposes related to investigating a breach of an agreement or a
                                                contravention of the laws of Canada or a province<bdt
                                                  class="statement-end-if-in-editor"></bdt></span></span></li>
                                        </ul>
                                        <div style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                              style="font-size: 15px;">
                                              <bdt class="block-component"></bdt>
                                            </span></span></div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span data-custom-class="body_text"><span
                                                style="font-size: 15px;">If disclosure is required to comply with
                                                a subpoena, warrant, court order, or rules of the court relating
                                                to the production of records<bdt class="statement-end-if-in-editor">
                                                </bdt></span></span></li>
                                        </ul>
                                        <div style="line-height: 1.5;">
                                          <bdt class="block-component"><span style="font-size: 15px;"><span
                                                data-custom-class="body_text"></span></span></bdt>
                                        </div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span style="font-size: 15px;"><span
                                                data-custom-class="body_text">If it was produced by an individual
                                                in the course of their employment, business, or profession and the
                                                collection is consistent with the purposes for which the
                                                information was produced<bdt class="statement-end-if-in-editor">
                                                </bdt></span></span></li>
                                        </ul>
                                        <div style="line-height: 1.5;"><span style="font-size: 15px;"><span
                                              data-custom-class="body_text">
                                              <bdt class="block-component"></bdt>
                                            </span></span></div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span style="font-size: 15px;"><span
                                                data-custom-class="body_text">If the collection is solely for
                                                journalistic, artistic, or literary purposes<bdt
                                                  class="statement-end-if-in-editor"></bdt></span></span></li>
                                        </ul>
                                        <div style="line-height: 1.5;"><span style="font-size: 15px;"><span
                                              data-custom-class="body_text">
                                              <bdt class="block-component"></bdt>
                                            </span></span></div>
                                        <ul>
                                          <li style="line-height: 1.5;"><span style="font-size: 15px;"><span
                                                data-custom-class="body_text">If the information is publicly
                                                available and is specified by the regulations</span>
                                              <bdt class="statement-end-if-in-editor"><span
                                                  data-custom-class="body_text"></span></bdt>
                                            </span></li>
                                        </ul>
                                        <div style="line-height: 1.5;">
                                          <bdt class="statement-end-if-in-editor"><span
                                              style="font-size: 15px;"><span
                                                data-custom-class="body_text"></span></span></bdt>
                                          <bdt class="statement-end-if-in-editor"><span
                                              style="font-size: 15px;"><span
                                                data-custom-class="body_text"></span></span></bdt>
                                        </div>
                                        <div style="line-height: 1.5;"><br></div>
                                        <div id="whoshare" style="line-height: 1.5;"><span
                                            style="color: rgb(127, 127, 127);"><span
                                              style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                  style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                    id="control" style="color: rgb(0, 0, 0);"><strong><span
                                                        data-custom-class="heading_1">4. WHEN AND WITH WHOM DO WE
                                                        SHARE YOUR PERSONAL
                                                        INFORMATION?</span></strong></span></span></span></span></span>
                                        </div>
                                        <div style="line-height: 1.5;"><br></div>
                                        <div style="line-height: 1.5;"><span
                                            style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                              style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                data-custom-class="body_text"><strong><em>In
                                                    Short:</em></strong><em>&nbsp;We do not share your personal data
                                                  with third parties.</em></span></span></span></div>
                                        <div style="line-height: 1.5;"><br></div>
                                        <div style="line-height: 1.5;"><span
                                            style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                              style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                data-custom-class="body_text">
                                                <bdt class="block-component"></bdt>
                                              </span></span></span></div>
                                        <div style="line-height: 1.5;"><span style="font-size: 15px;"><span
                                              data-custom-class="body_text">We do not share your personal
                                              information with third parties.</span></span></div>
                                        <div style="line-height: 1.5;"><span style="font-size: 15px;"><span
                                              data-custom-class="body_text">
                                              <bdt class="block-component"></bdt>
                                            </span></span>
                                          <div style="line-height: 1.5;"><span style="font-size: 15px;">
                                              <bdt class="block-component"><span
                                                  data-custom-class="body_text"></span></bdt>
                                            </span>
                                            <div style="line-height: 1.5;">
                                              <bdt class="block-component"><span style="font-size: 15px;"><span
                                                    data-custom-class="body_text"></span></span></bdt>
                                              <div style="line-height: 1.5;">
                                                <bdt class="block-component"><span style="font-size: 15px;"><span
                                                      data-custom-class="body_text"></span></span></bdt>
                                                <div style="line-height: 1.5;">
                                                  <bdt class="block-component"><span style="font-size: 15px;"><span
                                                        data-custom-class="body_text"></span></span></bdt>
                                                  <div style="line-height: 1.5;">
                                                    <bdt class="block-component"><span
                                                        style="font-size: 15px;"><span
                                                          data-custom-class="body_text"></span></span></bdt><span
                                                      style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                        style="font-size: 15px;"><span
                                                          style="color: rgb(89, 89, 89);"><span
                                                            style="font-size: 15px;"><span
                                                              style="color: rgb(89, 89, 89);">
                                                              <bdt class="block-component"><span
                                                                  data-custom-class="heading_1"></span></bdt>
                                                            </span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div id="cookies" style="line-height: 1.5;"><span
                                                      style="color: rgb(127, 127, 127);"><span
                                                        style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                          style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                            style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                              id="control"
                                                              style="color: rgb(0, 0, 0);"><strong><span
                                                                  data-custom-class="heading_1">5. DO WE USE
                                                                  COOKIES AND OTHER TRACKING
                                                                  TECHNOLOGIES?</span></strong></span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text"><strong><em>In
                                                              Short:</em></strong><em>&nbsp;We do use cookies and
                                                            other tracking technologies to collect and store your
                                                            information.</em></span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">We do use cookies and
                                                          similar tracking technologies (like web beacons and
                                                          pixels) to access or store information. We only use the
                                                          technologies that are essential to us offering our
                                                          Services.<span
                                                            style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                              data-custom-class="body_text">
                                                              <bdt class="block-component"></bdt>.
                                                            </span><span
                                                              style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                                style="font-size: 15px;"><span
                                                                  style="color: rgb(89, 89, 89);"><span
                                                                    style="font-size: 15px;"><span
                                                                      style="color: rgb(89, 89, 89);"><span
                                                                        data-custom-class="body_text">
                                                                        <bdt class="statement-end-if-in-editor">
                                                                        </bdt>
                                                                      </span></span></span></span></span></span></span></span><span
                                                          data-custom-class="body_text"><span
                                                            style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                              style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                                style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                                  style="font-size: 15px;"><span
                                                                    style="color: rgb(89, 89, 89);"><span
                                                                      style="font-size: 15px;"><span
                                                                        style="color: rgb(89, 89, 89);"><span
                                                                          data-custom-class="body_text">
                                                                          <bdt class="block-component"></bdt>
                                                                        </span>
                                                                        <bdt class="block-component"><span
                                                                            data-custom-class="body_text">
                                                                            <bdt class="block-component"></bdt>
                                                                          </span></bdt>
                                                                      </span></span></span></span></span></span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div id="inforetain" style="line-height: 1.5;"><span
                                                      style="color: rgb(127, 127, 127);"><span
                                                        style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                          style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                            style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                              id="control"
                                                              style="color: rgb(0, 0, 0);"><strong><span
                                                                  data-custom-class="heading_1">6. HOW LONG DO WE
                                                                  KEEP YOUR
                                                                  INFORMATION?</span></strong></span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text"><strong><em>In
                                                              Short:&nbsp;</em></strong><em>We keep your
                                                            information for as long as necessary to fulfill the
                                                            purposes outlined in this privacy notice unless
                                                            otherwise required by law.</em></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">We will only keep your
                                                          personal information for as long as it is necessary for
                                                          the purposes set out in this privacy notice, unless a
                                                          longer retention period is required or permitted by law
                                                          (such as tax, accounting, or other legal requirements).
                                                          No purpose in this notice will require us keeping your
                                                          personal information for longer than <span
                                                            style="font-size: 15px;"><span
                                                              style="color: rgb(89, 89, 89);"><span
                                                                data-custom-class="body_text">
                                                                <bdt class="block-component"></bdt>
                                                              </span></span></span>
                                                          <bdt class="block-component"></bdt>the period of time in
                                                          which users have an account with us<bdt
                                                            class="block-component"></bdt><span
                                                            style="font-size: 15px;"><span
                                                              style="color: rgb(89, 89, 89);"><span
                                                                data-custom-class="body_text">
                                                                <bdt class="else-block"></bdt>
                                                              </span></span></span>.
                                                        </span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">When we have no ongoing
                                                          legitimate business need to process your personal
                                                          information, we will either delete or anonymize such
                                                          information, or, if this is not possible (for example,
                                                          because your personal information has been stored in
                                                          backup archives), then we will securely store your
                                                          personal information and isolate it from any further
                                                          processing until deletion is possible.<span
                                                            style="color: rgb(89, 89, 89);">
                                                            <bdt class="block-component"></bdt>
                                                          </span></span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div id="infosafe" style="line-height: 1.5;"><span
                                                      style="color: rgb(127, 127, 127);"><span
                                                        style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                          style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                            style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                              id="control"
                                                              style="color: rgb(0, 0, 0);"><strong><span
                                                                  data-custom-class="heading_1">7. HOW DO WE KEEP
                                                                  YOUR INFORMATION
                                                                  SAFE?</span></strong></span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text"><strong><em>In
                                                              Short:&nbsp;</em></strong><em>We aim to protect your
                                                            personal information through a system of
                                                            organizational and technical security
                                                            measures.</em></span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">We have implemented
                                                          appropriate and reasonable technical and organizational
                                                          security measures designed to protect the security of
                                                          any personal information we process. However, despite
                                                          our safeguards and efforts to secure your information,
                                                          no electronic transmission over the Internet or
                                                          information storage technology can be guaranteed to be
                                                          100% secure, so we cannot promise or guarantee that
                                                          hackers, cybercriminals, or other unauthorized third
                                                          parties will not be able to defeat our security and
                                                          improperly collect, access, steal, or modify your
                                                          information. Although we will do our best to protect
                                                          your personal information, transmission of personal
                                                          information to and from our Services is at your own
                                                          risk. You should only access the Services within a
                                                          secure environment.<span style="color: rgb(89, 89, 89);">
                                                            <bdt class="statement-end-if-in-editor"></bdt>
                                                          </span><span
                                                            style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                              data-custom-class="body_text">
                                                              <bdt class="block-component"></bdt>
                                                            </span></span></span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div id="infominors" style="line-height: 1.5;"><span
                                                      style="color: rgb(127, 127, 127);"><span
                                                        style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                          style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                            style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                              id="control"
                                                              style="color: rgb(0, 0, 0);"><strong><span
                                                                  data-custom-class="heading_1">8. DO WE COLLECT
                                                                  INFORMATION FROM
                                                                  MINORS?</span></strong></span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text"><strong><em>In
                                                              Short:</em></strong><em>&nbsp;We do not knowingly
                                                            collect data from or market to children under 18 years
                                                            of age.</em></span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">We do not knowingly
                                                          solicit data from or market to children under 18 years
                                                          of age. By using the Services, you represent that you
                                                          are at least 18 or that you are the parent or guardian
                                                          of such a minor and consent to such minor dependent’s
                                                          use of the Services. If we learn that personal
                                                          information from users less than 18 years of age has
                                                          been collected, we will deactivate the account and take
                                                          reasonable measures to promptly delete such data from
                                                          our records. If you become aware of any data we may have
                                                          collected from children under age 18, please contact us
                                                          at <span
                                                            style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                              data-custom-class="body_text">
                                                              <bdt class="block-component"></bdt>
                                                              <bdt class="question">info@goodhub.org.uk</bdt>
                                                              <bdt class="else-block"></bdt>
                                                            </span></span>.<span
                                                            style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                              style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                                data-custom-class="body_text">
                                                                <bdt class="statement-end-if-in-editor"></bdt>
                                                              </span></span></span></span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div id="privacyrights" style="line-height: 1.5;"><span
                                                      style="color: rgb(127, 127, 127);"><span
                                                        style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                          style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                            style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                              id="control"
                                                              style="color: rgb(0, 0, 0);"><strong><span
                                                                  data-custom-class="heading_1">9. WHAT ARE YOUR
                                                                  PRIVACY
                                                                  RIGHTS?</span></strong></span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text"><strong><em>In
                                                              Short:</em></strong><em>&nbsp;<span
                                                              style="color: rgb(89, 89, 89);"><span
                                                                style="font-size: 15px;"><span
                                                                  data-custom-class="body_text"><em>
                                                                    <bdt class="block-component"></bdt>
                                                                  </em></span></span></span>In some regions, such
                                                            as <bdt class="block-component"></bdt>the European
                                                            Economic Area (EEA), United Kingdom (UK), and Canada
                                                            <bdt class="block-component"></bdt>, you have rights
                                                            that allow you greater access to and control over your
                                                            personal information.<span
                                                              style="color: rgb(89, 89, 89);"><span
                                                                style="font-size: 15px;"><span
                                                                  data-custom-class="body_text"><em>
                                                                    <bdt class="statement-end-if-in-editor"></bdt>
                                                                  </em></span></span>&nbsp;</span>You may review,
                                                            change, or terminate your account at any
                                                            time.
                                                          </em><span style="color: rgb(89, 89, 89);"><span
                                                              style="font-size: 15px;">
                                                              <bdt class="block-component"></bdt>
                                                            </span></span></span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">In some regions (like <bdt
                                                            class="block-component"></bdt>the EEA, UK, and Canada
                                                          <bdt class="block-component"></bdt>), you have certain
                                                          rights under applicable data protection laws. These may
                                                          include the right (i) to request access and obtain a
                                                          copy of your personal information, (ii) to request
                                                          rectification or erasure; (iii) to restrict the
                                                          processing of your personal information; and (iv) if
                                                          applicable, to data portability. In certain
                                                          circumstances, you may also have the right to object to
                                                          the processing of your personal information. You can
                                                          make such a request by contacting us by using the
                                                          contact details provided in the section
                                                          “
                                                        </span></span></span><a data-custom-class="link"
                                                      href="#contact"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                            data-custom-class="body_text">HOW CAN YOU CONTACT US
                                                            ABOUT THIS NOTICE?</span></span></span></a><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">”
                                                          below.</span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">We will consider and act
                                                          upon any request in accordance with applicable data
                                                          protection laws.</span><span
                                                          data-custom-class="body_text"><span
                                                            style="font-size: 15px;"><span
                                                              style="color: rgb(89, 89, 89);"><span
                                                                data-custom-class="body_text"><span
                                                                  style="color: rgb(89, 89, 89);"><span
                                                                    style="font-size: 15px;">
                                                                    <bdt class="statement-end-if-in-editor"></bdt>
                                                                  </span></span></span></span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);">&nbsp;</span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">If you are located in the
                                                          EEA or UK and you believe we are unlawfully processing
                                                          your personal information, you also have the right to
                                                          complain to your local data protection supervisory
                                                          authority. You can find their contact details here:
                                                          <span style="font-size: 15px;"><span
                                                              style="color: rgb(89, 89, 89);"><span
                                                                data-custom-class="body_text"><span
                                                                  style="color: rgb(48, 48, 241);"><span
                                                                    data-custom-class="body_text"><a
                                                                      data-custom-class="link"
                                                                      href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
                                                                      rel="noopener noreferrer"
                                                                      target="_blank"><span
                                                                        style="font-size: 15px;">https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm</span></a></span></span></span></span></span>.</span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">If you are located in
                                                          Switzerland, the contact details for the data protection
                                                          authorities are available here: <span
                                                            style="font-size: 15px;"><span
                                                              style="color: rgb(89, 89, 89);"><span
                                                                data-custom-class="body_text"><span
                                                                  style="color: rgb(48, 48, 241);"><span
                                                                    data-custom-class="body_text"><span
                                                                      style="font-size: 15px;"><a
                                                                        data-custom-class="link"
                                                                        href="https://www.edoeb.admin.ch/edoeb/en/home.html"
                                                                        rel="noopener noreferrer"
                                                                        target="_blank">https://www.edoeb.admin.ch/edoeb/en/home.html</a></span></span></span></span></span></span>.</span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div id="withdrawconsent" style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text"><strong><u>Withdrawing
                                                              your consent:</u></strong> If we are relying on your
                                                          consent to process your personal information,<bdt
                                                            class="block-component"></bdt> which may be express
                                                          and/or implied consent depending on the applicable law,
                                                          <bdt class="statement-end-if-in-editor"></bdt> you have
                                                          the right to withdraw your consent at any time. You can
                                                          withdraw your consent at any time by contacting us by
                                                          using the contact details provided in the section
                                                          "
                                                        </span></span></span><a data-custom-class="link"
                                                      href="#contact"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                            data-custom-class="body_text">HOW CAN YOU CONTACT US
                                                            ABOUT THIS NOTICE?</span></span></span></a><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">" below<bdt
                                                            class="block-component"></bdt> or updating your
                                                          preferences<bdt class="statement-end-if-in-editor">
                                                          </bdt>.</span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px;"><span
                                                        data-custom-class="body_text">However, please note that
                                                        this will not affect the lawfulness of the processing
                                                        before its withdrawal, nor<bdt class="block-component">
                                                        </bdt> when applicable law allows,<bdt
                                                          class="statement-end-if-in-editor"></bdt> will it affect
                                                        the processing of your personal information conducted in
                                                        reliance on lawful processing grounds other than consent.
                                                        <bdt class="block-component"></bdt>
                                                      </span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px;"><span
                                                        data-custom-class="body_text"><strong><u>Opting out of
                                                            marketing and promotional
                                                            communications:</u></strong><strong><u>&nbsp;</u></strong>You
                                                        can unsubscribe from our marketing and promotional
                                                        communications at any time by<bdt class="block-component">
                                                        </bdt> clicking on the unsubscribe link in the emails that
                                                        we send,<bdt class="statement-end-if-in-editor"></bdt>
                                                        <bdt class="block-component"></bdt>
                                                        <bdt class="block-component"></bdt> or by contacting us
                                                        using the details provided in the section "
                                                      </span></span><a data-custom-class="link"
                                                      href="#contact"><span style="font-size: 15px;"><span
                                                          data-custom-class="body_text">HOW CAN YOU CONTACT US
                                                          ABOUT THIS NOTICE?</span></span></a><span
                                                      style="font-size: 15px;"><span data-custom-class="body_text">"
                                                        below. You will then be
                                                        removed from the marketing lists — however, we may still
                                                        communicate with you, for example to send you
                                                        service-related messages that are necessary for the
                                                        administration and use of your account, to respond to
                                                        service requests, or for other non-marketing
                                                        purposes.</span><span data-custom-class="body_text">
                                                        <bdt class="statement-end-if-in-editor"></bdt>
                                                      </span></span>
                                                    <bdt class="block-component"><span
                                                        style="font-size: 15px;"><span
                                                          data-custom-class="body_text"></span></span></bdt>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px;"><span
                                                        data-custom-class="heading_2"><strong>Account
                                                          Information</strong></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      data-custom-class="body_text"><span
                                                        style="font-size: 15px;">If you would at any time like to
                                                        review or change the information in your account or
                                                        terminate your account, you can:<bdt
                                                          class="forloop-component"></bdt></span></span></div>
                                                  <ul>
                                                    <li style="line-height: 1.5;"><span
                                                        data-custom-class="body_text"><span
                                                          style="font-size: 15px;">
                                                          <bdt class="question">Contact us using the contact
                                                            information provided.</bdt>
                                                        </span></span></li>
                                                  </ul>
                                                  <div style="line-height: 1.5;"><span
                                                      data-custom-class="body_text"><span style="font-size: 15px;">
                                                        <bdt class="forloop-component"></bdt>
                                                      </span></span></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px;"><span
                                                        data-custom-class="body_text">Upon your request to
                                                        terminate your account, we will deactivate or delete your
                                                        account and information from our active databases.
                                                        However, we may retain some information in our files to
                                                        prevent fraud, troubleshoot problems, assist with any
                                                        investigations, enforce our legal terms and/or comply with
                                                        applicable legal requirements.</span></span>
                                                    <bdt class="statement-end-if-in-editor"><span
                                                        style="font-size: 15px;"><span
                                                          data-custom-class="body_text"></span></span></bdt><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text"><span
                                                            style="font-size: 15px;"><span
                                                              style="color: rgb(89, 89, 89);"><span
                                                                style="font-size: 15px;"><span
                                                                  style="color: rgb(89, 89, 89);"><span
                                                                    data-custom-class="body_text"><span
                                                                      style="font-size: 15px;"><span
                                                                        style="color: rgb(89, 89, 89);">
                                                                        <bdt class="block-component"></bdt>
                                                                      </span></span></span></span></span></span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text"><strong><u>Cookies and
                                                              similar technologies:</u></strong> Most Web browsers
                                                          are set to accept cookies by default. If you prefer, you
                                                          can usually choose to set your browser to remove cookies
                                                          and to reject cookies. If you choose to remove cookies
                                                          or reject cookies, this could affect certain features or
                                                          services of our Services. To opt out of interest-based
                                                          advertising by advertisers on our Services visit <span
                                                            style="color: rgb(48, 48, 241);"><span
                                                              data-custom-class="body_text"><a
                                                                data-custom-class="link"
                                                                href="http://www.aboutads.info/choices/"
                                                                rel="noopener noreferrer" target="_blank"><span
                                                                  style="font-size: 15px;">http://www.aboutads.info/choices/</span></a></span></span>.
                                                          <span style="font-size: 15px;"><span
                                                              style="color: rgb(89, 89, 89);"><span
                                                                data-custom-class="body_text">
                                                                <bdt class="block-component"></bdt><span
                                                                  style="font-size: 15px;"><span
                                                                    style="color: rgb(89, 89, 89);"><span
                                                                      style="font-size: 15px;"><span
                                                                        style="color: rgb(89, 89, 89);"><span
                                                                          style="font-size: 15px;"><span
                                                                            style="color: rgb(89, 89, 89);">
                                                                            <bdt class="statement-end-if-in-editor">
                                                                            </bdt>
                                                                          </span></span></span></span></span></span>
                                                              </span></span></span></span></span></span>
                                                    <bdt class="block-component"><span
                                                        style="font-size: 15px;"><span
                                                          data-custom-class="body_text"></span></span></bdt>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      data-custom-class="body_text"><span
                                                        style="font-size: 15px;">If you have questions or comments
                                                        about your privacy rights, you may email us at <bdt
                                                          class="question">info@goodhub.org.uk</bdt>
                                                        .</span></span>
                                                    <bdt class="statement-end-if-in-editor"><span
                                                        style="font-size: 15px;"><span
                                                          data-custom-class="body_text"></span></span></bdt>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div id="DNT" style="line-height: 1.5;"><span
                                                      style="color: rgb(127, 127, 127);"><span
                                                        style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                          style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                            style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                              id="control"
                                                              style="color: rgb(0, 0, 0);"><strong><span
                                                                  data-custom-class="heading_1">10. CONTROLS FOR
                                                                  DO-NOT-TRACK
                                                                  FEATURES</span></strong></span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">Most web browsers and some
                                                          mobile operating systems and mobile applications include
                                                          a Do-Not-Track ("DNT") feature or setting you can
                                                          activate to signal your privacy preference not to have
                                                          data about your online browsing activities monitored and
                                                          collected. At this stage no uniform technology standard
                                                          for recognizing and implementing DNT signals has been
                                                          finalized. As such, we do not currently respond to DNT
                                                          browser signals or any other mechanism that
                                                          automatically communicates your choice not to be tracked
                                                          online. If a standard for online tracking is adopted
                                                          that we must follow in the future, we will inform you
                                                          about that practice in a revised version of this privacy
                                                          notice.</span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div id="caresidents" style="line-height: 1.5;"><span
                                                      style="color: rgb(127, 127, 127);"><span
                                                        style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                          style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                            style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                              id="control"
                                                              style="color: rgb(0, 0, 0);"><strong><span
                                                                  data-custom-class="heading_1">11. DO CALIFORNIA
                                                                  RESIDENTS HAVE SPECIFIC PRIVACY
                                                                  RIGHTS?</span></strong></span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text"><strong><em>In
                                                              Short:&nbsp;</em></strong><em>No, as we do not
                                                            disclose information to third parties, there is no need
                                                            for any special provision.</em></span></span></span>
                                                  </div>

                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div id="policyupdates" style="line-height: 1.5;"><span
                                                      style="color: rgb(127, 127, 127);"><span
                                                        style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                          style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                            style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                              id="control"
                                                              style="color: rgb(0, 0, 0);"><strong><span
                                                                  data-custom-class="heading_1">12. DO WE MAKE
                                                                  UPDATES TO THIS
                                                                  NOTICE?</span></strong></span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text"><em><strong>In
                                                              Short:&nbsp;</strong>Yes, we will update this notice
                                                            as necessary to stay compliant with relevant
                                                            laws.</em></span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">We may update this privacy
                                                          notice from time to time. The updated version will be
                                                          indicated by an updated "Revised" date and the updated
                                                          version will be effective as soon as it is accessible.
                                                          If we make material changes to this privacy notice, we
                                                          may notify you either by prominently posting a notice of
                                                          such changes or by directly sending you a notification.
                                                          We encourage you to review this privacy notice
                                                          frequently to be informed of how we are protecting your
                                                          information.</span></span></span></div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div id="contact" style="line-height: 1.5;"><span
                                                      style="color: rgb(127, 127, 127);"><span
                                                        style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                          style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                            style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                              id="control"
                                                              style="color: rgb(0, 0, 0);"><strong><span
                                                                  data-custom-class="heading_1">13. HOW CAN YOU
                                                                  CONTACT US ABOUT THIS
                                                                  NOTICE?</span></strong></span></span></span></span></span>
                                                  </div>
                                                  <div style="line-height: 1.5;"><br></div>
                                                  <div style="line-height: 1.5;"><span
                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                          data-custom-class="body_text">If you have questions or
                                                          comments about this notice, you may <span
                                                            style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                              data-custom-class="body_text">
                                                              <bdt class="block-component"></bdt>email us at <bdt
                                                                class="question">info@goodhub.org.uk</bdt>

                                                              <div style="line-height: 1.5;"><br></div>
                                                              <div id="request" style="line-height: 1.5;"><span
                                                                  style="color: rgb(127, 127, 127);"><span
                                                                    style="color: rgb(89, 89, 89); font-size: 15px;"><span
                                                                      style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                                        style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                                          id="control"
                                                                          style="color: rgb(0, 0, 0);"><strong><span
                                                                              data-custom-class="heading_1">14. HOW
                                                                              CAN YOU
                                                                              REVIEW, UPDATE, OR DELETE THE DATA WE
                                                                              COLLECT
                                                                              FROM
                                                                              YOU?</span></strong></span></span></span></span></span>
                                                              </div>
                                                              <div style="line-height: 1.5;"><br></div>
                                                              <div style="line-height: 1.5;"><span
                                                                  style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                                    style="font-size: 15px; color: rgb(89, 89, 89);"><span
                                                                      data-custom-class="body_text">Based on the
                                                                      applicable
                                                                      laws of your country, you may have the right
                                                                      to request
                                                                      access to the personal information we collect
                                                                      from you,
                                                                      change that information, or delete it in some
                                                                      circumstances. To request to review, update,
                                                                      or delete
                                                                      your personal information, please email us at
                                                                      <bdt class="question">info@goodhub.org.uk
                                                                      </bdt></span>
                                                                    <bdt class="block-component"><span
                                                                        data-custom-class="body_text"></span></bdt>
                                                                  </span></span><span
                                                                  data-custom-class="body_text">.</span>
                                                              </div>
                                                              <style>
                                                                ul {
                                                                  list-style-type: square;
                                                                }

                                                                ul>li>ul {
                                                                  list-style-type: circle;
                                                                }

                                                                ul>li>ul>li>ul {
                                                                  list-style-type: square;
                                                                }

                                                                ol li {
                                                                  font-family: Arial;
                                                                }
                                                              </style>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`


export interface PrivacyPolicyProps {}

const PrivacyPolicy: FC<PrivacyPolicyProps> = () => {
  return <div className="my-4" dangerouslySetInnerHTML={{ __html: policy }} />
}

export default PrivacyPolicy;