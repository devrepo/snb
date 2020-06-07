import React from 'react';
import Breadcrumbs from "./breadcrumbs"
import DiscountCountdown from "./discountCountdown"
import AddToCartButton from "./addToCartButton"
import Attributes from "./attributes"
import Gallery from "./gallery"
import Options from "./options"
import Price from "./price"
import Quantity from "./quantity"
import Tags from "./tags"
import { themeSettings, text } from "../../lib/settings"
const Description = ({ description }) => (
    <div
      className="product-content"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  )

export default class TailoredProduct extends React.Component{
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

    render () {
        
        const { product, settings, categories } = this.props
        const { selectedVariant, isAllOptionsSelected } = this.state;

        const maxQuantity =
            product.stock_status === "discontinued"
                ? 0
                : product.stock_backorder
                ? themeSettings.maxCartItemQty
                : selectedVariant
                ? selectedVariant.stock_quantity
                : product.stock_quantity

        return (
            <div>
                <section className="section section-product">
                    <div className="container">
                    <div className="columns">
                        <div className="column is-7">
                        {themeSettings.show_product_breadcrumbs && (
                            <Breadcrumbs product={product} categories={categories} />
                        )}
                        <Gallery images={product.images} />
                        </div>
                        <div className="column is-5">
                        <div className="content">
                            <Tags tags={product.tags} />
                            <h1 className="title is-4 product-name">{product.name}</h1>
                            <Price
                            product={product}
                            variant={selectedVariant}
                            isAllOptionsSelected={isAllOptionsSelected}
                            settings={settings}
                            />

                            {themeSettings.show_discount_countdown &&
                            product.on_sale === true && (
                                <DiscountCountdown product={product} />
                            )}

                            
                            <Quantity
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
                        </div>
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