import React from 'react';
import Breadcrumbs from "../../breadcrumbs"
import DiscountCountdown from "../../discountCountdown"
import AddToCartButton from "../../addToCartButton"
import Attributes from "../../attributes"
import Gallery from "../../gallery"
import Price from "../../price"
import Quantity from "../../quantity"
import Tags from "../../tags"
import { themeSettings, text } from "../../../../lib/settings"
import withSizes from 'react-sizes'
import BlouseOptions from './blouseOptions';

const Description = ({ description }) => (
    <div
      className="product-content"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  )

class Blouse extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedOptions: {},
            selectedVariant: null,
            isAllOptionsSelected: false,
            quantity: 1,
        }

        /*this.onOptionChange = this.onOptionChange.bind(this)
        this.findVariantBySelectedOptions = this.findVariantBySelectedOptions.bind(
            this
        )
        this.checkSelectedOptions = this.checkSelectedOptions.bind(this)
        this.addToCartStoreProduct = this.addToCartStoreProduct.bind(this);*/

    }

    setQuantity = quantity => {
        this.setState({ quantity })
    }

    getQuantityAndAddtoCart(){
        const { product } = this.props
        const { selectedVariant, isAllOptionsSelected } = this.state;
        const maxQuantity =
            product.stock_status === "discontinued"
                ? 0
                : product.stock_backorder
                ? themeSettings.maxCartItemQty
                : selectedVariant
                ? selectedVariant.stock_quantity
                : product.stock_quantity
        return <div>
            <Quantity
                quantity = {this.state.quantity}
                maxQuantity={maxQuantity}
                onChange={this.setQuantity}
            />
            <div className="button-addtocart">
                <AddToCartButton
                    product={product}
                    variant={selectedVariant}
                    addCartItem={this.addToCartStoreProduct}
                    isAllOptionsSelected={isAllOptionsSelected}
                />
            </div>
        </div>
    }

    getOptions(){
        return <BlouseOptions />
    }
    render () {
        
        const { product, settings, categories, isMobile } = this.props
        const { selectedVariant, isAllOptionsSelected } = this.state;

        return (
            <div>
                <section className="section section-product">
                    <div className="container">
                    
                    <div className="columns is-mobile">
                        <div className="column is-7">
                            {themeSettings.show_product_breadcrumbs && (
                                <Breadcrumbs product={product} categories={categories} />
                            )}
                            <h1 className="title is-4 tailoring-product-name">{product.name}</h1>
                            <Tags tags={product.tags} />
                        </div>
                    </div>
                    <div className="columns is-mobile">
                        <div className="column is-half">
                            <div className="image-container">
                                <Gallery images={product.images} />
                            </div>
                        </div>
                        <div className="column is-half">
                            <h2>Stitching Charges</h2>
                            <Price
                                product={product}
                                variant={selectedVariant}
                                isAllOptionsSelected={isAllOptionsSelected}
                                settings={settings}
                            />
                            <div className="content is-hidden-mobile">
                                {!isMobile && this.getOptions()}
                                {!isMobile && this.getQuantityAndAddtoCart()}
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="columns is-hidden-tablet">
                        <div className="column is-full">
                            {isMobile && this.getOptions()}
                            {isMobile && this.getQuantityAndAddtoCart()}
                        </div>
                    </div>
                    
                </section>

                <section className="section section-product-description">
                    <div className="container">
                    <div className="content">
                        <div className="columns">
                        <div className="column is-7">
                            <Description description={product.description} />
                        </div>
                        <div className="column is-5">
                            <Attributes attributes={product.attributes} />
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapSizesToProps = ({ width }) => ({
    isMobile: width < 768,
})

export default withSizes(mapSizesToProps)(Blouse);