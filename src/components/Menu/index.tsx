import React, { memo, useCallback } from 'react'
import { AppBar, Hidden, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import { ReactComponent as Logo } from 'assets/img/logo.svg'
import { useCommonStyles } from '../../styles/use-styles'

import { ReactComponent as Wallet } from 'assets/img/wallet.svg'
import { setWalletMenu, setHiddenMenu } from 'state/show'
import { useAppDispatch } from 'state'
import { useArcadeContext } from 'hooks/useArcadeContext'
import SelectWalletModal from 'components/Modal/SelectWallet'
import { useShow } from 'state/show/hook'

const useStyles = makeStyles(() => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFFDF4',
    boxShadow: '0px 4px 21px rgba(0, 0, 0, 0.08)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
}))



const Menu = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const commonClasses = useCommonStyles()
  const { fullscreen } = useArcadeContext()
  const { walletMenu, hiddenMenu } = useShow()
  const { account, updateConnect, connectType } = useArcadeContext()
  const shortenString = useCallback((source: string) => {
    if (source.length <= 12) return source
  
    return '********' + source.substring(source.length - 6, source.length)
  }, [])

  const onConnectWalletHandler = async () => {
    dispatch(setWalletMenu(true))
    dispatch(setHiddenMenu('hidden-menu'))
  }
  return (
    <div className="mein-menu">
      <nav className="navbar navbar-expand-lg navbar-dark ">
          <div className="container">
              <a className="navbar-brand" href="#">
                  <Logo width={200} height={80}/>
              </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                      {/* <li className="nav-item">
                          <div className="language-select">
                              <select className="select-bar" style={{ display : "none" }}>
                                  <option value="">EN</option>
                                  <option value="">IN</option>
                                  <option value="">BN</option>
                              </select><div className="nice-select select-bar"><span className="current">EN</span><ul className="list"><li data-value="" className="option selected">EN</li><li data-value="" className="option">IN</li><li data-value="" className="option">BN</li></ul></div>
                          </div>
                      </li> */}
                      <li className="nav-item">
                          <a className="nav-link button-1" onClick={onConnectWalletHandler}>{account ? shortenString(account) : 'Connect'}</a>
                          <Hidden xsDown>
                            <SelectWalletModal open={walletMenu} connectedWallet={Number(connectType)}/>
                          </Hidden>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    </div>
  )
}

export default memo(Menu)
