import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import * as helper from "../../lib/helper"
import { themeSettings, text } from "../../lib/settings"
import Disqus from "../comments/disqus"
import ViewedProducts from "../products/viewed"
import RelatedProducts from "./relatedProducts"
import StoreProduct from './storeProduct';
import Blouse from './tailorProducts//blouse/blouse';



export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
    this.addToCart = this.addToCart.bind(this);
    this.addToCartStoreProduct = this.addToCartStoreProduct.bind(this);
  }

  
  addToCartStoreProduct(selectedVariant, quantity){
    const { product, addCartItem } = this.props
    const item = {
      product_id: product.id,
      quantity
    }

    if (selectedVariant) {
      item.variant_id = selectedVariant.id
    }

    addCartItem(item)
  }
  addToCart() {
    const { product, addCartItem } = this.props
    const { selectedVariant } = this.state

    const item = {
      product_id: product.id,
      quantity: 1,
    }

    if (selectedVariant) {
      item.variant_id = selectedVariant.id
    }

    addCartItem(item)
  }


  render() {
    const { product, settings, categories } = this.props
    
    if (product) {
      return (
        <Fragment>
          {product.category_name == "Custom Tailoring" &&
            (product.name == "Blouse" && <Blouse 
              {...this.props}
              addToCartStoreProduct= {this.addToCartStoreProduct} /> )
            
          }

          {product.category_name != "Custom Tailoring" &&
            <StoreProduct 
              {...this.props}
              addToCartStoreProduct= {this.addToCartStoreProduct} />}

          <RelatedProducts
            settings={settings}
            addCartItem={this.addToCart}
            ids={product.related_product_ids}
            limit={10}
          />

          {themeSettings.show_viewed_products && (
            <ViewedProducts
              settings={settings}
              addCartItem={this.addToCart}
              product={product}
              limit={themeSettings.limit_viewed_products || 4}
            />
          )}

          {themeSettings.disqus_shortname &&
            themeSettings.disqus_shortname !== "" && (
              <section className="section">
                <div className="container">
                  <Disqus
                    shortname={themeSettings.disqus_shortname}
                    identifier={product.id}
                    title={product.name}
                    url={product.url}
                  />
                </div>
              </section>
            )}
        </Fragment>
      )
    }
    return null
  }
}
