import React, {Fragment, useContext, useEffect, useState} from 'react';
import AppWideContext from "../../../store/AppWideContext";
import PageHead from "../../../components/PageHead";
import Footer from "../../../components/footer/Footer";
import CategoryHeaderImage from "../../../components/common/CategoryHeaderImage";
import Header from "../../../components/navbar/Header";

/**
 * @todo @Sambhav css
 * @returns {JSX.Element}
 */


function TermsAndConditionPage() {
    const {dataStore} = useContext(AppWideContext);

    const category = "Terms & Conditions";
    const blockStyle = `flex flex-col gap-y-4`;
    const blockLeadStyle = `font-600`;
    const mobileParaStyle = `mb-10`;
    const mobileView =
        (<div className='w-full px-[13%] mx-auto text-[#525252d6] text-justify'>
            <span className={"block text-2xl text-center text-black py-5 font-700"}>Terms and Conditions</span>
            <p className = {mobileParaStyle}>Welcome to <span className={`underline`}>saltattire.com</span> website (hereinafter
                the &quot;Website&quot;).</p>
            <p className = {mobileParaStyle}>
                PLEASE READ THE FOLLOWING TERMS AND CONDITIONS OF USE OF THE WEBSITE (HEREINAFTER THE &quot;TERMS OF
                USE&quot;)
                CAREFULLY BEFORE USING THE WEBSITE.
            </p>
            <p className = {mobileParaStyle}>The Terms of Use govern the access to, and use of, the Website.</p>
            <p className = {mobileParaStyle}>
                Use of the Website implies the full acceptance of these Terms of Use and all guidelines and rules, and
                acknowledgement of their relevant mandatory nature. You are only authorized to use the Website if you
                agree
                to abide by all applicable laws and the terms of these Terms of Use. If you ( &quot;User&quot;) do not
                agree to be
                bound by these Terms of Use and to follow all applicable laws, you should not proceed with using the
                Services.
            </p>
            <p className = {mobileParaStyle}>
                Saltattire reserves the right, at its sole discretion, to modify these Terms of Use from time to time.
                We
                will post the revised Terms of Use on this Website and update the &quot;Last Updated&quot; date to
                reflect the
                date of the changes. Please consult these Terms of Use regularly. The use of the Website after such
                modifications constitutes your full acceptance of the revised Terms of Use. If you do not agree with the
                revised Terms of Use, please stop using the Website.
            </p>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>1. IMPRINT</p>
                <p>
                    <span className={blockLeadStyle}>1.1</span> The Website and its contents are designed, operated and
                    administered by Mimoto Technologies
                    Private Limited, with registered office in A-66 1St floor Gurunanakpura, VikasMargLaxmi Nagar,
                    Delhi, Central Delhi, Delhi, India, 110092
                    (hereinafter &quot;Saltattire&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>2. INTELLECTUAL PROPERTY RIGHTS</p>
                <p>
                    <span className={blockLeadStyle}>2.1</span> The
                    terms &quot;Website&quot; and &quot;Material&quot; refer, respectively, by way of example, to the
                    software
                    design, implementation and use of the Website, the layout, structure and organization of the
                    contents of the Website, and to any Material reproduced therein and / or made available to the
                    public, including in particular the collection and organization of data and information,
                    photographs, images, illustrations, texts, video clips, musical compositions, audio clips, designs,
                    devices, logos, trademarks, distinctive elements so-called trade dress or any other Material
                    reproduced and / or made available through this Website (&quot;Material&quot;).
                </p>
                <p>
                    <span className={blockLeadStyle}>2.2</span> All Materials on this Website, in whole and in part,
                    including by way of example trademarks,
                    domain names, designs and models, patents and copyright, are protected and in the sole ownership of
                    Saltattire. All rights are reserved, worldwide.
                </p>
                <p>
                    <span className={blockLeadStyle}>2.3</span> All trademarks, trade names, logos and other distinctive
                    designs and signs which are reproduced
                    on the Website, whether registered or not, are trademarks or service marks of Saltattire. All domain
                    names used on the Website and / or connected to it are owned - or used with permission - by
                    Saltattire, which manages them on a worldwide basis.
                </p>
                <p>
                    <span className={blockLeadStyle}>2.4</span> This Website is solely for private, personal and
                    non-commercial use, and the Material on this
                    Website is presented for information and/ or promotional purposes only.
                </p>
                <p>
                    <span className={blockLeadStyle}>2.5</span> It is not permitted to reproduce (except where the
                    reproduction is made for personal
                    non-commercial use), publish, disclose, transmit, make available to the public, republish,
                    distribute, display, remove, delete, add to, or otherwise modify, create and / or use derivative
                    works from, or on any case works inspired to, sell or participate in any sale of, this Website, any
                    of the Material in this Website or related software , in whole and / or in part, in any form and /
                    or manner, and for any purpose. If the downloading or the copying should be permitted by Saltattire
                    in writing, the user will not obtain any right, title or interest in any Material or software as a
                    result of any such downloading or copying.
                </p>
                <p>
                    <span className={blockLeadStyle}>2.6</span> Saltattire is fully committed to maintain, enforce and
                    protect its intellectual property rights
                    throughout the world and to strongly fight against any infringement in order to ensure that its
                    unique heritage be strongly preserved and fully respected. Any use which is not expressly permitted
                    by these Terms of Use is prohibited. The lack of any remedy by Saltattire whether in court or
                    out-of-court does not mean acquiescence or tolerance of any violations of these Terms of Use of the
                    Website and / or breach of intellectual property rights of which Saltattire has the ownership and /
                    or availability.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>3. SUBMITTED MATERIAL</p>
                <p>
                    <span className={blockLeadStyle}>3.1</span> You acknowledge and agree that any proposals, projects,
                    ideas, concepts, photographs,
                    contributions or any other content and material (with the exception of personal information)
                    disclosed or sent to Saltattire through this Website or by other means (&quot;Submitted
                    Material&quot;) is not
                    considered confidential. By submitting the Submitted Material you grant to Saltattire a royalty
                    free, non-exclusive, worldwide right to copy, reproduce, publish, disclose, distribute or otherwise
                    use, in whole or in part, the Submitted Material, for the entire term of protection thereof, for
                    advertising, promotional or product development purposes.
                </p>
                <p><span className={blockLeadStyle}>3.2</span> Saltattire is not required or will not be required in the
                    future to:</p>
                <p><span className={blockLeadStyle}>(i)</span> Keep any Submitted Material confidential;</p>
                <p><span className={blockLeadStyle}>(ii)</span> pay compensation for any use of the Submitted Material
                    or in connection to it;</p>
                <p><span className={blockLeadStyle}>(iii)</span> respond to the submission of Submitted Material and /
                    or confirm the relevant receipt.</p>
                <p>
                    <span className={blockLeadStyle}>3.3</span> You declare and warrant that the Submitted Material does
                    not violate any rights of third parties
                    arising from the law and / or contract, including, by way of example, the rights related to the
                    author, trademarks, patents, trade secrets, confidentiality and any other proprietary or personal
                    rights.
                </p>
                <p>
                    <span className={blockLeadStyle}>3.4</span> By submitting the Submitted Materials, you acknowledge
                    the right, but not the obligation, of
                    Saltattire to copy, reproduce, publish, disclose, distribute or otherwise use such Submitted
                    Material, or any part thereof, for any purpose, including, by way of example, advertising,
                    promotional, product development or other commercial purposes, without in any case granting you or
                    any third party the right to any compensation. You are and will be fully responsible for the content
                    of any Submitted Material.
                </p>
                <p>
                    <span className={blockLeadStyle}>3.5</span> Saltattire retains the right to reject or delete any
                    Submitted Material for any or no reasons,
                    including Submitted Material that in our judgment violates these Terms of Use or which may be
                    offensive, illegal or violate the rights of any person or entity, or harm or threaten the safety of
                    any person or entity.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>4. LINKS TO OTHER SITES</p>
                <p>
                    <span className={blockLeadStyle}>4.1</span> This Website may contain links to other websites.
                    Saltattire has no control over such websites
                    and will not be responsible or liable for any accessibility of third party websites or for their
                    content.
                </p>
                <p>
                    <span className={blockLeadStyle}>4.2</span> Hyperlinks to other websites and references to
                    information, products or services of third parties
                    linked to this Website do not constitute, and should not be interpreted, in any way, as an
                    endorsement by Saltattire of such websites, information, products or services. Any question or
                    comment related to these websites must be addressed to the relevant operators.
                </p>
                <p>
                    <span className={blockLeadStyle}>4.3</span> You are not permitted to frame this Website on any other
                    website or to link to any part or
                    section of the Website and / or to the Material, in whole or in part, without prior written consent
                    of Saltattire.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>5. AUTHENTICITY OF PRODUCTS BRANDED &quot;SALTATTIRE&quot;</p>
                <p>
                    <span className={blockLeadStyle}>5.1 1</span> The products branded &quot;Saltattire&quot; promoted
                    through the Website are made with the finest
                    materials, and they are all MADE IN INIDIA.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>6. EXCLUSION OF WARRANTIES</p>
                <p>
                    <span className={blockLeadStyle}>6.1</span> TO THE EXTENT PERMITTED BY APPLICABLE LAW, THIS WEBSITE,
                    ITS CONTENTS AND SERVICES ARE PROVIDED
                    FREE OF CHARGE ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. SALTATTIRE PROVIDES NO
                    WARRANTY OR GUARANTEE
                    IN CONNECTION WITH THIS WEBSITE, ITS CONTENT OR SERVICES, INCLUDING, BY WAY OF EXAMPLE, THAT IT WILL
                    ALWAYS BE AVAILABLE, WITHOUT INTERRUPTION OR ERRORS IN FUNCTIONING, OR THAT IT WILL BE SAFE FROM
                    MALICIOUS PROGRAMS (SUCH AS VIRUSES, BUGS, MALWARE OR SIMILAR), OR THAT IT IS SUITABILE FOR ANY
                    PARTICULAR PURPOSES, AND EXPRESSLY DECLINES ANY SUCH WARRANTIES.
                </p>
                <p>
                    <span className={blockLeadStyle}>6.2</span> SALTATTIRE WORKS TO ENSURE THAT THE INFORMATION MADE
                    AVAILABLE THROUGH THE WEBSITE IS ACCURATE
                    AND UP TO DATE. HOWEVER SALTATTIRE CANNOT GUARANTEE THE ACCURACY OF SUCH INFORMATION OR THAT SUCH
                    INFORMATION IS FREE FROM ERRORS OR OMISSIONS AND SALTATTIRE MAKES NO WARRANTY, AND SHALL HAVE NO
                    LIABILITY, IN RESPECT OF THE SAME. SALTATTIRE RESERVES THE RIGHT TO UPDATE AND/OR CORRECT THE
                    CONTENTS OF THE WEBSITE AT ANY TIME WITHOUT NOTICE AND WITHOUT ANY LIABILITY.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>7. LIMITATION OF LIABILITY</p>
                <p>
                    <span className={blockLeadStyle}>7.1</span> AS THE SERVICE IS PROVIDED FREE OF CHARGE, YOU ARE
                    RESPONSIBLE FOR EVALUATING THE INFORMATION AND
                    CONTENT OBTAINED THROUGH THE WEBSITE. BY USING THE WEBSITE YOU UNDERTAKE ALL RISKS CONNECTED TO THE
                    RELEVANT USE AND TO TAKE FULL RESPONSIBILITY FOR ANY FAILURE IN THE USE, LOSS OF DATA AND COSTS
                    ASSOCIATED WITH ALL NECESSARY SERVICE AND MAINTENANCE OF HARDWARE AND / OR SOFTWARE USED IN
                    CONNECTION WITH THE WEBSITE.
                </p>
                <p>
                    <span className={blockLeadStyle}>7.2</span> TO THE EXTENT PERMITTED BY APPLICABLE LAW, YOU ALSO
                    UNDERTAKE NOT TO HOLD US, OUR LICENSORS,
                    SERVICE PROVIDERS, AGENTS, OFFICERS, OR DIRECTORS, LIABLE, IN ANY WAY, FOR ANY POSSIBLE DAMAGES
                    INCLUDING WITHOUT LIMITATION DIRECT OR INDIRECT DAMAGES OF ANY KIND, LOSSES OR EXPENSES ARISING OR
                    RESULTING FROM THE USE OF THIS WEBSITE, THE SERVICES, ITS CONTENTS OR RELATED TO IT, OR ANY LINKED
                    SITE OR USE THEREOF OR INABILITY TO USE BY ANY PARTY, OR IN CONNECTION WITH ANY FAILURE OF
                    PERFORMANCE, ERROR, OMISSION, INTERRUPTION, DEFECT, DELAY IN OPERATION OR TRANSMISSION, COMPUTER
                    VIRUS OR LINE OR SYSTEM FAILURE, EVEN IF THEY ARE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, LOSSES
                    OR EXPENSES.
                </p>
                <p><span className={blockLeadStyle}>7.4</span> IT IS UNDERSTOOD THAT NOTHING IN THESE TERMS OF USE SHALL
                    EXCLUDE OR LIMIT:</p>
                <p>
                    <span className={blockLeadStyle}>(I)</span> OUR LIABILITY IN CASE OF DEATH OR PERSONAL INJURY;
                    <span className={blockLeadStyle}>(II)</span> OUR LIABILITY IN CASE OF FRAUD, FRAUDULENT
                    MISREPRESENTATION OR GROSS NEGLIGENCE;
                    <span className={blockLeadStyle}>(III)</span>AND/OR ANY OTHER LIABILITY THAT CANNOT BE EXCLUDED OR
                    LIMITED BY APPLICABLE LAW.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>8. INDEMNITY</p>
                <p>
                    <span className={blockLeadStyle}>8.1</span> You agree to indemnify and hold us, and each of our
                    subsidiaries and affiliates, and their
                    respective officers, agents, partners and employees, harmless from any loss, liability, claim, or
                    demand, including reasonable attorneys&apos; fees, made by any third party due to or arising out of
                    your
                    use of the Website and the Services in violation of these Terms of Use and/or arising from a breach
                    of these Terms of Use and/or any breach of your representations and warranties set forth herein
                    and/or if any Submitted Material that is transmitted through the Services causes our liability to a
                    third party.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>9. GOVERNING LAW</p>
                <p>
                    <span className={blockLeadStyle}>9.1</span> These Terms of Use and any non-contractual obligations
                    arising out of or in relation to the Terms
                    of Use shall be governed by and will be interpreted in accordance with Indian laws (without regard
                    to its conflict of law provisions), except otherwise provided under mandatory local legislation of
                    your place of residence. All disputes arising out of or relating to these Terms of Use or any
                    non-contractual obligations arising out of or relating to the Terms of Use shall be submitted to the
                    exclusive jurisdiction of Delhi High courts. Saltattire shall have the exclusive right to file for
                    any dispute with you in the courts of your place of residence or incorporation.
                </p>
            </div>
        </div>);



    const browserView = (
        <div className={`flex flex-col gap-y-8 text-justify w-1/2 mx-auto text-[#777]`}>
            <p>Welcome to <span className={`underline`}>saltattire.com</span> website (hereinafter
                the &quot;Website&quot;).</p>
            <p>
                PLEASE READ THE FOLLOWING TERMS AND CONDITIONS OF USE OF THE WEBSITE (HEREINAFTER THE &quot;TERMS OF
                USE&quot;)
                CAREFULLY BEFORE USING THE WEBSITE.
            </p>
            <p>The Terms of Use govern the access to, and use of, the Website.</p>
            <p>
                Use of the Website implies the full acceptance of these Terms of Use and all guidelines and rules, and
                acknowledgement of their relevant mandatory nature. You are only authorized to use the Website if you
                agree
                to abide by all applicable laws and the terms of these Terms of Use. If you ( &quot;User&quot;) do not
                agree to be
                bound by these Terms of Use and to follow all applicable laws, you should not proceed with using the
                Services.
            </p>
            <p>
                Saltattire reserves the right, at its sole discretion, to modify these Terms of Use from time to time.
                We
                will post the revised Terms of Use on this Website and update the &quot;Last Updated&quot; date to
                reflect the
                date of the changes. Please consult these Terms of Use regularly. The use of the Website after such
                modifications constitutes your full acceptance of the revised Terms of Use. If you do not agree with the
                revised Terms of Use, please stop using the Website.
            </p>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>1. IMPRINT</p>
                <p>
                    <span className={blockLeadStyle}>1.1</span> The Website and its contents are designed, operated and
                    administered by Mimoto Technologies
                    Private Limited, with registered office in A-66 1St floor Gurunanakpura, VikasMargLaxmi Nagar,
                    Delhi, Central Delhi, Delhi, India, 110092
                    (hereinafter &quot;Saltattire&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>2. INTELLECTUAL PROPERTY RIGHTS</p>
                <p>
                    <span className={blockLeadStyle}>2.1</span> The
                    terms &quot;Website&quot; and &quot;Material&quot; refer, respectively, by way of example, to the
                    software
                    design, implementation and use of the Website, the layout, structure and organization of the
                    contents of the Website, and to any Material reproduced therein and / or made available to the
                    public, including in particular the collection and organization of data and information,
                    photographs, images, illustrations, texts, video clips, musical compositions, audio clips, designs,
                    devices, logos, trademarks, distinctive elements so-called trade dress or any other Material
                    reproduced and / or made available through this Website (&quot;Material&quot;).
                </p>
                <p>
                    <span className={blockLeadStyle}>2.2</span> All Materials on this Website, in whole and in part,
                    including by way of example trademarks,
                    domain names, designs and models, patents and copyright, are protected and in the sole ownership of
                    Saltattire. All rights are reserved, worldwide.
                </p>
                <p>
                    <span className={blockLeadStyle}>2.3</span> All trademarks, trade names, logos and other distinctive
                    designs and signs which are reproduced
                    on the Website, whether registered or not, are trademarks or service marks of Saltattire. All domain
                    names used on the Website and / or connected to it are owned - or used with permission - by
                    Saltattire, which manages them on a worldwide basis.
                </p>
                <p>
                    <span className={blockLeadStyle}>2.4</span> This Website is solely for private, personal and
                    non-commercial use, and the Material on this
                    Website is presented for information and/ or promotional purposes only.
                </p>
                <p>
                    <span className={blockLeadStyle}>2.5</span> It is not permitted to reproduce (except where the
                    reproduction is made for personal
                    non-commercial use), publish, disclose, transmit, make available to the public, republish,
                    distribute, display, remove, delete, add to, or otherwise modify, create and / or use derivative
                    works from, or on any case works inspired to, sell or participate in any sale of, this Website, any
                    of the Material in this Website or related software , in whole and / or in part, in any form and /
                    or manner, and for any purpose. If the downloading or the copying should be permitted by Saltattire
                    in writing, the user will not obtain any right, title or interest in any Material or software as a
                    result of any such downloading or copying.
                </p>
                <p>
                    <span className={blockLeadStyle}>2.6</span> Saltattire is fully committed to maintain, enforce and
                    protect its intellectual property rights
                    throughout the world and to strongly fight against any infringement in order to ensure that its
                    unique heritage be strongly preserved and fully respected. Any use which is not expressly permitted
                    by these Terms of Use is prohibited. The lack of any remedy by Saltattire whether in court or
                    out-of-court does not mean acquiescence or tolerance of any violations of these Terms of Use of the
                    Website and / or breach of intellectual property rights of which Saltattire has the ownership and /
                    or availability.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>3. SUBMITTED MATERIAL</p>
                <p>
                    <span className={blockLeadStyle}>3.1</span> You acknowledge and agree that any proposals, projects,
                    ideas, concepts, photographs,
                    contributions or any other content and material (with the exception of personal information)
                    disclosed or sent to Saltattire through this Website or by other means (&quot;Submitted
                    Material&quot;) is not
                    considered confidential. By submitting the Submitted Material you grant to Saltattire a royalty
                    free, non-exclusive, worldwide right to copy, reproduce, publish, disclose, distribute or otherwise
                    use, in whole or in part, the Submitted Material, for the entire term of protection thereof, for
                    advertising, promotional or product development purposes.
                </p>
                <p><span className={blockLeadStyle}>3.2</span> Saltattire is not required or will not be required in the
                    future to:</p>
                <p><span className={blockLeadStyle}>(i)</span> Keep any Submitted Material confidential;</p>
                <p><span className={blockLeadStyle}>(ii)</span> pay compensation for any use of the Submitted Material
                    or in connection to it;</p>
                <p><span className={blockLeadStyle}>(iii)</span> respond to the submission of Submitted Material and /
                    or confirm the relevant receipt.</p>
                <p>
                    <span className={blockLeadStyle}>3.3</span> You declare and warrant that the Submitted Material does
                    not violate any rights of third parties
                    arising from the law and / or contract, including, by way of example, the rights related to the
                    author, trademarks, patents, trade secrets, confidentiality and any other proprietary or personal
                    rights.
                </p>
                <p>
                    <span className={blockLeadStyle}>3.4</span> By submitting the Submitted Materials, you acknowledge
                    the right, but not the obligation, of
                    Saltattire to copy, reproduce, publish, disclose, distribute or otherwise use such Submitted
                    Material, or any part thereof, for any purpose, including, by way of example, advertising,
                    promotional, product development or other commercial purposes, without in any case granting you or
                    any third party the right to any compensation. You are and will be fully responsible for the content
                    of any Submitted Material.
                </p>
                <p>
                    <span className={blockLeadStyle}>3.5</span> Saltattire retains the right to reject or delete any
                    Submitted Material for any or no reasons,
                    including Submitted Material that in our judgment violates these Terms of Use or which may be
                    offensive, illegal or violate the rights of any person or entity, or harm or threaten the safety of
                    any person or entity.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>4. LINKS TO OTHER SITES</p>
                <p>
                    <span className={blockLeadStyle}>4.1</span> This Website may contain links to other websites.
                    Saltattire has no control over such websites
                    and will not be responsible or liable for any accessibility of third party websites or for their
                    content.
                </p>
                <p>
                    <span className={blockLeadStyle}>4.2</span> Hyperlinks to other websites and references to
                    information, products or services of third parties
                    linked to this Website do not constitute, and should not be interpreted, in any way, as an
                    endorsement by Saltattire of such websites, information, products or services. Any question or
                    comment related to these websites must be addressed to the relevant operators.
                </p>
                <p>
                    <span className={blockLeadStyle}>4.3</span> You are not permitted to frame this Website on any other
                    website or to link to any part or
                    section of the Website and / or to the Material, in whole or in part, without prior written consent
                    of Saltattire.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>5. AUTHENTICITY OF PRODUCTS BRANDED &quot;SALTATTIRE&quot;</p>
                <p>
                    <span className={blockLeadStyle}>5.1 1</span> The products branded &quot;Saltattire&quot; promoted
                    through the Website are made with the finest
                    materials, and they are all MADE IN INIDIA.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>6. EXCLUSION OF WARRANTIES</p>
                <p>
                    <span className={blockLeadStyle}>6.1</span> TO THE EXTENT PERMITTED BY APPLICABLE LAW, THIS WEBSITE,
                    ITS CONTENTS AND SERVICES ARE PROVIDED
                    FREE OF CHARGE ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. SALTATTIRE PROVIDES NO
                    WARRANTY OR GUARANTEE
                    IN CONNECTION WITH THIS WEBSITE, ITS CONTENT OR SERVICES, INCLUDING, BY WAY OF EXAMPLE, THAT IT WILL
                    ALWAYS BE AVAILABLE, WITHOUT INTERRUPTION OR ERRORS IN FUNCTIONING, OR THAT IT WILL BE SAFE FROM
                    MALICIOUS PROGRAMS (SUCH AS VIRUSES, BUGS, MALWARE OR SIMILAR), OR THAT IT IS SUITABILE FOR ANY
                    PARTICULAR PURPOSES, AND EXPRESSLY DECLINES ANY SUCH WARRANTIES.
                </p>
                <p>
                    <span className={blockLeadStyle}>6.2</span> SALTATTIRE WORKS TO ENSURE THAT THE INFORMATION MADE
                    AVAILABLE THROUGH THE WEBSITE IS ACCURATE
                    AND UP TO DATE. HOWEVER SALTATTIRE CANNOT GUARANTEE THE ACCURACY OF SUCH INFORMATION OR THAT SUCH
                    INFORMATION IS FREE FROM ERRORS OR OMISSIONS AND SALTATTIRE MAKES NO WARRANTY, AND SHALL HAVE NO
                    LIABILITY, IN RESPECT OF THE SAME. SALTATTIRE RESERVES THE RIGHT TO UPDATE AND/OR CORRECT THE
                    CONTENTS OF THE WEBSITE AT ANY TIME WITHOUT NOTICE AND WITHOUT ANY LIABILITY.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>7. LIMITATION OF LIABILITY</p>
                <p>
                    <span className={blockLeadStyle}>7.1</span> AS THE SERVICE IS PROVIDED FREE OF CHARGE, YOU ARE
                    RESPONSIBLE FOR EVALUATING THE INFORMATION AND
                    CONTENT OBTAINED THROUGH THE WEBSITE. BY USING THE WEBSITE YOU UNDERTAKE ALL RISKS CONNECTED TO THE
                    RELEVANT USE AND TO TAKE FULL RESPONSIBILITY FOR ANY FAILURE IN THE USE, LOSS OF DATA AND COSTS
                    ASSOCIATED WITH ALL NECESSARY SERVICE AND MAINTENANCE OF HARDWARE AND / OR SOFTWARE USED IN
                    CONNECTION WITH THE WEBSITE.
                </p>
                <p>
                    <span className={blockLeadStyle}>7.2</span> TO THE EXTENT PERMITTED BY APPLICABLE LAW, YOU ALSO
                    UNDERTAKE NOT TO HOLD US, OUR LICENSORS,
                    SERVICE PROVIDERS, AGENTS, OFFICERS, OR DIRECTORS, LIABLE, IN ANY WAY, FOR ANY POSSIBLE DAMAGES
                    INCLUDING WITHOUT LIMITATION DIRECT OR INDIRECT DAMAGES OF ANY KIND, LOSSES OR EXPENSES ARISING OR
                    RESULTING FROM THE USE OF THIS WEBSITE, THE SERVICES, ITS CONTENTS OR RELATED TO IT, OR ANY LINKED
                    SITE OR USE THEREOF OR INABILITY TO USE BY ANY PARTY, OR IN CONNECTION WITH ANY FAILURE OF
                    PERFORMANCE, ERROR, OMISSION, INTERRUPTION, DEFECT, DELAY IN OPERATION OR TRANSMISSION, COMPUTER
                    VIRUS OR LINE OR SYSTEM FAILURE, EVEN IF THEY ARE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, LOSSES
                    OR EXPENSES.
                </p>
                <p><span className={blockLeadStyle}>7.4</span> IT IS UNDERSTOOD THAT NOTHING IN THESE TERMS OF USE SHALL
                    EXCLUDE OR LIMIT:</p>
                <p>
                    <span className={blockLeadStyle}>(I)</span> OUR LIABILITY IN CASE OF DEATH OR PERSONAL INJURY;
                    <span className={blockLeadStyle}>(II)</span> OUR LIABILITY IN CASE OF FRAUD, FRAUDULENT
                    MISREPRESENTATION OR GROSS NEGLIGENCE;
                    <span className={blockLeadStyle}>(III)</span>AND/OR ANY OTHER LIABILITY THAT CANNOT BE EXCLUDED OR
                    LIMITED BY APPLICABLE LAW.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>8. INDEMNITY</p>
                <p>
                    <span className={blockLeadStyle}>8.1</span> You agree to indemnify and hold us, and each of our
                    subsidiaries and affiliates, and their
                    respective officers, agents, partners and employees, harmless from any loss, liability, claim, or
                    demand, including reasonable attorneys&apos; fees, made by any third party due to or arising out of
                    your
                    use of the Website and the Services in violation of these Terms of Use and/or arising from a breach
                    of these Terms of Use and/or any breach of your representations and warranties set forth herein
                    and/or if any Submitted Material that is transmitted through the Services causes our liability to a
                    third party.
                </p>
            </div>
            <div className={blockStyle}>
                <p className={blockLeadStyle}>9. GOVERNING LAW</p>
                <p>
                    <span className={blockLeadStyle}>9.1</span> These Terms of Use and any non-contractual obligations
                    arising out of or in relation to the Terms
                    of Use shall be governed by and will be interpreted in accordance with Indian laws (without regard
                    to its conflict of law provisions), except otherwise provided under mandatory local legislation of
                    your place of residence. All disputes arising out of or relating to these Terms of Use or any
                    non-contractual obligations arising out of or relating to the Terms of Use shall be submitted to the
                    exclusive jurisdiction of Delhi High courts. Saltattire shall have the exclusive right to file for
                    any dispute with you in the courts of your place of residence or incorporation.
                </p>
            </div>
        </div>
    );

    return (
        <Fragment>
            <PageHead url="/salt/terms-and-condition" id="termsandcondition" isMobile={dataStore.mobile}/>
            <Header type={dataStore.mobile?"minimal":"shopMenu"} isMobile={dataStore.mobile}/>
            <CategoryHeaderImage category={category}/>
            <section className="my-20">
                {(dataStore.mobile) ? mobileView : browserView}
            </section>
            <Footer isMobile={dataStore.mobile} minimal={true} color={"#f5f5f5"}/>
        </Fragment>
    );
}

export default TermsAndConditionPage;
