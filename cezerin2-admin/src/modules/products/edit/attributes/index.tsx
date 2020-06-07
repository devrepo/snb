import { connect } from "react-redux"
import { withRouter } from "react-router"
import { updateProduct } from "../../actions"
import ProductAttributesForm from "./components/form"

const mapStateToProps = (state, ownProps) => ({
  initialValues: state.products.editProduct,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: values => {
    dispatch(
      updateProduct({
        id: values.id,
        attributes: values.attributes,
      })
    )
  },
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductAttributesForm)
)
