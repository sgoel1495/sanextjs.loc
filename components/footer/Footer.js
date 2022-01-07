/**
 * @params {isMobile} props
 * @constructor
 */

function Footer(props) {
  const mobileView = null;

  const browserView = <footer>
    <div>
      <h6>
        GET ON OUR LIST FOR MORE!
      </h6>
      <ul>
        <li>
          Sign Up for new looks, insider styling tips, exclusive offers and more.
        </li>
        <li>
          <form>
            <div>
              <input type="text" name="signup_email" id="signup_email" placeholder="Email Address"/>
              <button type="button" name="signup_btn">+</button>
            </div>
          </form>
        </li>
        <li>
          By entering your email, you agree to our <br/>
          <strong>
            <a href="/salt/terms-and-condition">
              <span> Terms &amp; Conditions </span>
            </a>
            +
            <a href="/salt/privacy-policy">
              <span>Privacy Policy</span>
            </a>
          </strong>
          , including receipt of emails and promotions. You can unsubscribe at any time.
        </li>
      </ul>
      <div>
        <ul>
          <li><i className="fa fa-cc-mastercard"/></li>
          <li><i className="fa fa-cc-visa"/></li>
          <li><i className="fa fa-cc-amex"/></li>
        </ul>
      </div>
    </div>

    <div>
      <h6>
        CUSTOMER SERVICE
      </h6>
      <ul class="footerlist">
        <li>
          <a href="/salt/shipping-returns" target="_blank">
            Shipping &amp; Returns
          </a>
        </li>
        <li>
          <a href="/salt/cancellation-modifications" target="_blank">
            Cancellation &amp; Modifications
          </a>
        </li>
        <li>
          <a href="/salt/faq" target="_blank">
            FAQ
          </a>
        </li>
        <li>
          <a href="/salt/sitemap" target="_blank">
            Site Map
          </a>
        </li>
        <li>
          <a href="/salt/contact-us" target="_blank">
            Contact Us
          </a>
        </li>
      </ul>
    </div>

    <div>
      <h6>LEGAL &amp; COOKIES</h6>
      <ul>
        <li>
          <a href="/salt/terms-and-condition" target="_blank">
            Terms &amp; Conditions
          </a>
        </li>
        <li>
          <a href="/salt/privacy-policy" target="_blank">
            Privacy Policy
          </a></li>
      </ul>
      <div>
        <h6>
          FOLLOW US ON
        </h6>
        <ul>
          <li>
            <a href="https://www.instagram.com/saltattire" target="_blank">
              <i className="fa fa-instagram fa_font_style"/>
              Instagram
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/saltattire" target="_blank">
              <i className="fa fa-facebook fa_font_style"/>
              Facebook
            </a>
          </li>
          <li>
            <a href="https://twitter.com/saltattire" target="_blank">
              <i className="fa fa-twitter fa_font_style"/>
              Twitter
            </a>
          </li>
          <li>
            <a href="https://plus.google.com/113620197761223008326" target="_blank">
              <i className="fa fa-google-plus fa_font_style"/>
              Google+
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
;

return (
(props.isMobile) ? mobileView : browserView
)

}

export default Footer;