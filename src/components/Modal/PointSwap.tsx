import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import { ThemeProvider } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { Button } from '@material-ui/core'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import RowLabel from 'components/Label/RowLabel'
import { dialogTheme } from 'styles/theme'
import WALLET from 'assets/img/wallet.svg'
import IconLabel from 'components/Label/IconLabel'
import SwitchLabel from 'components/Label/SwitchLabel'
import SwapGameToken from './SwapGameToken'
import ARCADE from 'assets/img/avatar.png'
import STARSHARD from 'assets/img/starshard.png'
import Switch from 'assets/img/switch.svg'
import SwapItem from 'components/Item/SwapItem'
import { Token } from 'global/interface'
import * as Wallet from '../../global/wallet'
import useRefresh from 'hooks/useRefresh'
import { getVerificationCode } from 'hooks/api'
import { getGamepointValidation } from 'hooks/gameapi'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { useSwap, useArcadeDoge, useBep20Price, useMarsDoge, useGameUserInfo } from 'hooks/useContract'
import { useAppDispatch } from 'state'
import { setIsLoading } from 'state/show'
import SkeletonLoading from 'components/SkeletonLoading'
import { arcadeAlert } from 'utils/arcadealert'
import { useGetArcadeDogeRate } from 'state/swap/hook'
import { useArcadeBalance } from 'hooks/useTokenBalance'
import { usePointBalance } from 'hooks/usePointBalance'

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

interface Props {
  open: boolean
  onClose: () => void
}

const PointSwap: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { account } = useArcadeContext()
  const swap = useSwap(account ?? '')
  const arcadeDoge = useArcadeDoge()
  const bep20Price = useBep20Price()
  const arcadeDogeRate = useGetArcadeDogeRate()
  const { gcToken, gcPerArc } = useMarsDoge(account ?? '')
  const { weightedAverage } = useGameUserInfo(account)
  const arcadeBalance = useArcadeBalance()
  const gamePointBalance = usePointBalance()
 
  const [inputCoin, setInputCoin] = useState<Token>({
    tokenAvartar: ARCADE,
    tokenName: '$ARC',
    tokenFullName: 'ARC'
  })
  const [outputCoin, setOutputCoin] = useState<Token>({
    tokenAvartar: STARSHARD,
    tokenName: 'STARSHARD',
    tokenFullName: 'StarShards'
  })
  const { slowRefresh } = useRefresh()
  const [gamePointRate, setGamePointRate] = useState(new BigNumber(NaN))
  const [sellGamePointRate, setSellGamePointRate] = useState(new BigNumber(NaN))
  const [swapRate, setSwapRate] = useState(0.0)
  const [openSwapToken, setOpenSwapToken] = useState(false)
  const [outputBalance, setOutputBalance] = useState(0)
  const [inputBalance, setInputBalance] = useState(0)
  const [inputAlert, setInputAlert] = useState(false)
  const [isConvertable, setConvertable] = useState(false)
  const [txDuration, setTxDuration] = useState<number>(100)

  // const getConvertableStatus = async () => {
  //   if (!account) return

  //   swap.methods.txDuration().call()
  //   .then((result: string) => {
  //     setTxDuration(parseInt(result, 10))
  //     swap.methods.lastTxTime(account, 1).call()
  //     .then((lastTime: string) => {
  //       const now = new Date().getTime() / 1000
  //       const last = parseInt(lastTime, 10)
  //       if (now > last + txDuration)
  //         setConvertable(true)
  //       else
  //         setConvertable(false)
  //     })
  //   })
  // }

  // const getGamePointRate = async () => {
  //   swap.methods
  //     .gamePointPrice(1)
  //     .call()
  //     .then((res: string) => {
  //       setGamePointRate(new BigNumber(res).div(10 ** 3))
  //     })
  //     .catch(() => {
  //       setTimeout(getGamePointRate, 500)
  //     })
  // }

  // const getSellGamePointRate = async () => {
  //   swap.methods
  //     .getGamePointRate(account, 1)
  //     .call()
  //     .then((res: string) => {
  //       setSellGamePointRate(new BigNumber(res).div(10 ** 18))
  //     })
  //     .catch(() => {
  //       setTimeout(getSellGamePointRate, 500)
  //     })
  // }

  const updateInputAlert = useCallback(() => {
    if (inputCoin.tokenName === "$ARC")
    {
      if(!arcadeBalance)
        setInputAlert(true)
      else
        setInputAlert(false)
    } else {
      if(!gamePointBalance || gamePointBalance.lt(new BigNumber(inputBalance)))
        setInputAlert(true)
      else
        setInputAlert(false)
    }
  }, [inputCoin, arcadeBalance, gamePointBalance, inputBalance])

  const onSwitchToken = useCallback(() => {
    const input = outputCoin, output = inputCoin
    setInputCoin(input)
    setOutputCoin(output)
  }, [setInputCoin, setOutputCoin, inputCoin, outputCoin])


  useEffect(() => {
    updateInputAlert()
  }, [updateInputAlert])

  const checkGamePoint = (txid: string, step: number = 0) => {
    try{
      getGamepointValidation(txid)
      .then((res: any) => {
        if (res.result === 0) {
          arcadeAlert("The in-game currency has been successfully converted!")
          dispatch(setIsLoading(false))
        } else {
          if (step === 60) {
            arcadeAlert("The in-game currency conversion will be processed in a few minutes")
            dispatch(setIsLoading(false))
          } else {
            setTimeout(checkGamePoint, 1000, txid, step + 1)
          }
        }
      })
    } catch(err) {
      if (step === 60) {
        arcadeAlert("The in-game currency conversion will be processed in a few minutes")
        dispatch(setIsLoading(false))
      } else {
        setTimeout(checkGamePoint, 1000, txid, step + 1)
      }
    }
    
  }

  const buyArcade = async () => {
    dispatch(setIsLoading(true))

    if (!(await Wallet.isConnected())) {
      dispatch(setIsLoading(false))
      return
    }

    account && getVerificationCode(1, account, inputBalance)
    .then(async (res) => {
      if (res.result === false) {
        if (res.msg !== undefined)
          arcadeAlert(res.msg as string)
        else
          arcadeAlert("Unknown Error!")
        dispatch(setIsLoading(false))
        onClose()
        return
      }

      const { v, r, s } = res.data

      Wallet.sendTransaction(
        swap.methods
        .sellGc({
          maker: account,
          requester: account,
          gcToken,
          gameId: 1,
          amount: inputBalance,
          reserved1: 0,
          reserved2: 0,
          v,
          r,
          s
        }), account)
        .then((res: any) => {
          checkGamePoint(res.transactionHash)
        })
        .catch(() => {
          arcadeAlert("Oh no! The conversion failed. Please try again.")
          dispatch(setIsLoading(false))
        })
        
    })
  }

  const onConvert = () => {
    if (!(inputBalance > 0)) {
      arcadeAlert("Please input valid amount!")
      return
    }
    
    if (inputCoin && inputCoin?.tokenName === "$ARC") {
      setOpenSwapToken(true)
    } else {
      buyArcade()
    }
  }

  // const getArcadeBalance = async () => {
  //   if (account) {
  //     arcadeDoge.methods
  //     .balanceOf(account)
  //     .call()
  //     .then((res: string) => {
  //       setArcadeBalance(new BigNumber(res).div(10 ** 18))
  //     })
  //     .catch(() => {
  //       setTimeout(getArcadeBalance, 500)
  //     })
  //   }
  // }

  // const getGamePointBalance = () => {
  //   if (account) {
  //     getBalance(account)
  //     .then((res) => {
  //       if (res.result === 0) {
  //         setGamePointBalance(new BigNumber(res.data.balance))
  //       }
  //     })
  //   } else {
  //     setTimeout(getGamePointBalance, 500)
  //   }
  // }

  useEffect(() => {
    if (arcadeDogeRate.s === null || 
        gamePointRate.s === null || 
        sellGamePointRate.s === null) {
      setSwapRate(0.0)
    }
    else if (inputCoin?.tokenName !== "$ARC") {
      setSwapRate(sellGamePointRate.toNumber())
    }
    else {
      setSwapRate(arcadeDogeRate.div(gamePointRate).toNumber())
    }
  }, [arcadeDogeRate, gamePointRate, sellGamePointRate, inputCoin])

  const onChangeInput = (valueStr: string) => {
    const value = Number.parseFloat(valueStr)
    if (isNaN(value) && valueStr.length > 0) {
      return
    }
    setInputBalance(value)
    if (value > 0) {
      if (inputCoin.tokenName === "$ARC")
      {
        if(!arcadeBalance)
          setInputAlert(true)
        else
          setInputAlert(false)
      } else {
        if(!gamePointBalance)
          setInputAlert(true)
        else
          setInputAlert(false)
      }
    }
  }

  const onCloseSwapToken = (txHappened: boolean = false) => {
      if (txHappened) {
        setConvertable(false)
      }
      
      setOpenSwapToken(false)
  }

  const onClose = () => {
    setInputBalance(0)
    props.onClose()
  }

  useEffect(() => {
    if (inputBalance >= 0)
      setOutputBalance(inputBalance * swapRate)
    else
      setOutputBalance(0)

    // getConvertableStatus()
  // eslint-disable-next-line
  }, [inputCoin, inputBalance, swapRate])

  useEffect(() => {
    if (!account) return
    // getArcadeDogeRate()
    // getGamePointRate()
    // getSellGamePointRate()
    // getArcadeBalance()
    // getGamePointBalance()
    // getConvertableStatus()
  // eslint-disable-next-line
  }, [slowRefresh, account])

  return (
    <Dialog
      className="card-dialog"
      onClose={onClose}
      maxWidth="md"
      aria-labelledby="customized-dialog-title"
      open={props.open}
      PaperProps={{ style: { borderRadius: 7 } }}
    >
      <DialogTitle className="swap-modal-title modal-dialog-title">
        <div className="flex-row">
          <RowLabel>Convert Tokens</RowLabel>
          <div className="flex-row r-flex-row r-mt-px-15 ml-auto" style={{ flexWrap: 'wrap' }}>
            <IconLabel
              avatar={WALLET}
              label="Balance"
              avatarWidth="25"
              avatarHeight="25"
              fontSize="16px"
              fontColor="#7E5504"
              style={{ color: '#7E5504', marginRight: '8px' }}
              />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <SwitchLabel
                avatar={ARCADE}
                label={arcadeBalance?.toFixed(2).toString() ?? '0'}
                avatarWidth="17"
                avatarHeight="17"
                fontSize="14px"
                fontColor="#7E5504"
                style={{ color: '#7E5504', marginRight: '4px' }}
                />
              
              <SwitchLabel
                avatar={STARSHARD}
                label={gamePointBalance?.toString() ?? '0'}
                avatarWidth="17"
                avatarHeight="17"
                fontSize="14px"
                fontColor="#7E5504"
                style={{ color: '#7E5504', marginRight: '4px' }}
                />
            </div>
          </div>
        </div>
      </DialogTitle>
      <DialogContent className="swap-modal-content" dividers>
        <div>
          <SwapItem
            avatar={inputCoin?.tokenAvartar}
            label={inputCoin?.tokenFullName}
            avatarWidth="30"
            avatarHeight="30"
            fontSize="28px"
            fontColor="#22303D"
            isInput={true}
            coinName={inputCoin?.tokenName}
            onChange={onChangeInput}
            isAlert={inputAlert}
            />

          <IconLabel
            avatar={Switch}
            label="Switch"
            avatarWidth="24"
            avatarHeight="24"
            fontSize="13px"
            style={{  
              color: '#B7B091', 
              marginRight: '0', 
              marginBottom: '20px', 
              marginLeft: '3px', 
              width: 'fit-content' 
            }}
            onClick={onSwitchToken}
            className="switch-link"
            />
          <SwapItem
            avatar={outputCoin?.tokenAvartar}
            label={outputCoin?.tokenFullName}
            avatarWidth="30"
            avatarHeight="30"
            fontSize="28px"
            fontColor="#22303D"
            isInput={false}    
            coinName={outputCoin?.tokenName}
            coinValue={ inputCoin?.tokenName === "$ARC" ? 
                        outputBalance.toFixed(0).toString() : 
                        outputBalance.toFixed(4).toString() }
            />
        </div>
      </DialogContent>
      <DialogActions className="modal-dialog-action pt-20">
        <div className="flex-row display-inline">
          <ThemeProvider theme={dialogTheme}>
            <Button 
              className="modal-btn r-mb-px-15" 
              variant="contained" 
              color="primary" 
              onClick={onConvert} 
              style={{ float: "right" }}
              disabled={inputAlert || !isConvertable}
            >
              Convert
            </Button>
          </ThemeProvider>
          <div className="swap-footer-label" style={{ display: 'flex' }}>
            {inputCoin?.tokenName} to {outputCoin?.tokenName} Conversion is 
            {
              swapRate === 0 ? 
                (<SkeletonLoading 
                  style={{ width: '40px', height: '20px', marginRight: '-10px', marginTop: '-3px' }} show={true} />)
              : ` 1 : ${swapRate.toFixed(4)}`
            }
          </div>
        </div>
      </DialogActions>
      <IconButton aria-label="close" className="modal-close" onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <SwapGameToken
        open={openSwapToken}
        rate={swapRate}
        amount={new BigNumber(inputBalance)}
        inputCoin={inputCoin}
        outputCoin={outputCoin}
        onClose={onCloseSwapToken}
      />
    </Dialog>
  )
}

export default PointSwap
