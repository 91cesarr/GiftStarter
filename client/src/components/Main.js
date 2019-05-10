import React, { useEffect, useContext } from "react"
import { connect } from "../actions/actions"
import { AuthContext } from "../lib/auth"

const Main = props => {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    connect(user)
  }, [user])

  return (
    <div className="room">
    </div>
  )
}

export default Main
