import React from "react"
import style from "./style.css"
import Account from "./account"
import Developer from "./developer"

export default class WebStoreAccountDetails extends React.Component {
  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    const { account, onAccountSubmit, onDeveloperSubmit } = this.props
    const developerData = account ? account.developer : null

    if (account) {
      return (
        <div className={`${style.detailsContainer} scroll col-full-height`}>
          <Account initialValues={account} onSubmit={onAccountSubmit} />
          {account && account.is_developer === true && (
            <Developer
              initialValues={developerData}
              onSubmit={onDeveloperSubmit}
            />
          )}
        </div>
      )
    }
    return null
  }
}
