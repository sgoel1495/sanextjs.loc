/**
 * @params {isMobile} props
 * @constructor
 */

function DesignBlock(props) {
  const mobileView = null;

  const browserView = <div id="design-block">
    <div>
      <h2>
        ~ Our Design ~
      </h2>
      <div>
        <p>
          Our design team has a simple philosophy, design a nine to nine wardrobe for the contemporary
          working woman. We have anticipated your needs, your lifestyle, your schedule to create designs
          which are functional, sophisticated and chic. We focus on clean cuts with finer detailing.
          We understand the need for functionality without compromising on the aesthetic appeal.
        </p>
        <p>
          Yes!, you can wear something comfortable and flattering into the office without a second thought.
          At Salt, we create elevated basics that are work appropriate; with no plunging necklines or high
          slits. Also, for any designs that require the clothing to be sheer, we provide a camisole.
        </p>
      </div>
    </div>

    <div>
      <h2>
        ~ Fabric ~
      </h2>
      <div>
        <p>
          After traveling across various markets in search for that perfect fabric,(We must&lsquo;ve crossed over
          10 million steps on fitbit too!), we brought together a selection of fabrics which are
          aesthetically pleasing, feel good on your skin and are very comfortable for all day wear.
        </p>
        <p>
          These are of premium quality, lightweight and durable.
          Our polyesters are light weight, all weather, easy to maintain and wrinkle free.
        </p>
      </div>
    </div>

    <div>
      <h2>
        ~ Size & Fit ~
      </h2>
      <div>
        <p>
          While conducting our research, we discovered that most brands in India often follow size charts of
          UK or US. This leads to undesired consequences in fit and the look of the clothing item.
          If you found a dress or a top which looked great on the hanger but after trying it on, the fit was
          not right, it was most likely a result of improper sizing.
        </p>
        <p>
          Our on ground team talked to over 500 women shoppers and understood their requirements for fit and
          comfort, especially when it comes to a professional setting and all-day clothing.
        </p>
        <p>
          We offer 3 kinds of fits: Fitted, Straight, Comfort.
        </p>
        <p>
          All our pants and skirts are tailored and are made from stretchable fabric. Our pants have
          elasticated waistbands at the back to fit your well on the waist and hips. Our dresses are made
          with stretch fabric with darts wherever required.
        </p>
      </div>
    </div>

    <div>
      <h2>
        ~ Affordable Luxury ~
      </h2>
      <div>
        <p>
          We understand the frustration you face when whatever you like costs a bomb and the ones with sane
          prices are not upto the mark.
        </p>
        <p>
          Our pledge is to bring you premium fabrics, elegant designs and impeccable craftsmanship at a
          reasonable yet approachable price.
        </p>
      </div>
    </div>

    <div>
      <h2>
        ~ Quality, Finishing & Details ~
      </h2>
      <div>
        <p>
          We take utmost care in making the garment, right from using the best quality threads to the
          accessories, whether it be buttons, zippers, hooks, other elements.
        </p>
        <p>
          Apart from the fabric, design and fit, we go through strict quality control parameters to give you
          what you truly deserve.
        </p>
        <p>
          All our fabric is:
          Pre-washed, to remove any stains and odor.
          Pre-shrunk, to ensure you will never have to face any shrinkage issue.
          Our shirts are designed to be gaping free.
          Pants and skirts are made with stretch fabric.
          And we offer tailored fitting for pants and skirts.
        </p>
        <p>
          To ensure our clothes are work-appropriate:
          All our clothing is modest with no plunging necklines or high slits that would make you
          uncomfortable at work. For any design that uses a sheer fabric, we provide you with a
          complimentary camisole.
        </p>
      </div>
    </div>
  </div>;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default DesignBlock;