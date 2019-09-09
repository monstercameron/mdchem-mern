import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { withRouter } from 'react-router-dom'
class Privacy extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
        <Container className='mt-5 mb-5 p-4 rounded shadow-lg' style={{background:'rgba(255,255,255,1)'}}>
            <Row>
                <Col sm={12} md={2} lg={1}
                    className='border rounded shadow-lg--hover align-middle text-center text-white cursor glow mb-3 pb-2 pt-2'
                    style={{ background: 'rgba(1,99,180,1)' }}
                    onClick={e => this.props.history.push('/')}
                >
                    <i className="material-icons">
                        arrow_back
                    </i>
                    Home
                </Col>
            </Row>

            <h1>Privacy Policy</h1>
            Effective date: June 19, 2019<br /><br />

            Miami Dade Chemistry ("us", "we", or "our") operates the Miami Dade Chemistry mobile application (the "Service").<br /><br />
            This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy for Miami Dade Chemistry is created with the help of the Free Privacy Policy Generator.<br /><br />
            We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.<br /><br />
            <h1>Information Collection And Use</h1>
            We collect several different types of information for various purposes to provide and improve our Service to you.<br /><br />
            <h1>Types of Data Collected</h1>
            <h2>Personal Data</h2>Personal Data
            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
            <ul>
                <li>
                    Email address</li>
                <li>
                    Cookies and Usage Data</li>
            </ul>
            <h2>Usage Data</h2>Usage Data
When you access the Service by or through a mobile device, we may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data ("Usage Data").<br /><br />
            <h2>Tracking & Cookies Data</h2>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.<br /><br />
            Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.<br /><br />
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.<br /><br />
            Examples of Cookies we use:
            <ul>
                <li><b>Session Cookies</b>. We use Session Cookies to operate our Service.</li>
                <li><b>Preference Cookies</b>. We use Preference Cookies to remember your preferences and various settings.</li>
                <li><b>Security Cookies</b>. We use Security Cookies for security purposes.</li>
            </ul>

            <h1>Use of Data</h1>
            Miami Dade Chemistry uses the collected data for various purposes:
            <ul>
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To provide analysis or valuable information so that we can improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
            </ul>

            <h1>Transfer Of Data</h1>
            Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.<br /><br />
            If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.<br /><br />
            Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.<br /><br />
            Miami Dade Chemistry will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.<br /><br />
            <h1>Disclosure Of Data</h1>
            <h2>Legal Requirements</h2><br />
            Miami Dade Chemistry may disclose your Personal Data in the good faith belief that such action is necessary to:<br /><br />
            <ul>
                <li>To comply with a legal obligation</li>
                <li>To protect and defend the rights or property of Miami Dade Chemistry</li>
                <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>To protect the personal safety of users of the Service or the public</li>
                <li>To protect against legal liability</li>
            </ul>

            <h1>Security Of Data</h1>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.<br /><br />
            <h1>Service Providers</h1>
            We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.<br /><br />
            These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.<br /><br />
            <h1>Links To Other Sites</h1>
            Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.<br /><br />
            We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.<br /><br />
            <h1>Children's Privacy</h1>
            Our Service does not address anyone under the age of 18 ("Children").<br /><br />
            We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.<br /><br />
            <h1>Changes To This Privacy Policy</h1>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.<br /><br />
            We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.<br /><br />
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.<br /><br />
            <h1>Contact Us</h1>
            If you have any questions about this Privacy Policy, please contact us:<br /><br />

            By email: <a href='mailto:david.freer@gmail.com'>david.freer@gmail.com</a><br /><br /><br /><br />


        </Container>)
    }
}

export default withRouter(Privacy)