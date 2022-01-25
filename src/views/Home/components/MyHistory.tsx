import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import Swal from 'sweetalert2'
import RowLabel from 'components/Label/RowLabel'
import { ReactComponent as IframeLogo } from 'assets/img/iframelogo.svg'

import { Typography, Button } from '@material-ui/core'
import { setWalletMenu } from 'state/show'
import { useAppDispatch } from 'state'
import { getTickets } from 'hooks/api'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { useLottery } from 'hooks/useContract'
import * as Wallet from 'global/wallet'
import { setIsLoading } from 'state/show'


const MyHistory: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const dispatch = useAppDispatch()
	const { account } = useArcadeContext();
	const lottery = useLottery(account ?? '');
	const [limit, setLimit] = useState(5);
	const [offset, setOffset] = useState(0);
	const [total, setTotal] = useState(0);
	const [tickets, setTickets] = useState<any[]>([]);

  const onConnectWalletHandler = async () => {
    dispatch(setWalletMenu(true))
  }

	const getMyTickets = async () => {
		if (!account) return;
		getTickets(account, limit, offset)
		.then(async res => {
			setTotal(res.total);
			for(let i in res.data) {
				res.data[i].ticketNums = JSON.parse(res.data[i].ticket_nums);

				const finalNumber = await lottery.methods.getLotteryFinalNumber(res.data[i].round).call()
				if (finalNumber[0] !== "0") {
					res.data[i].finalNumber = finalNumber;
				}

				const ticketInfo = await lottery.methods.tickets(res.data[i].ticket_id).call();
				if (ticketInfo.claimed) {
					res.data[i].status = 4;
				} else {
					const lotteryInfo = await lottery.methods.lotteries(res.data[i].round).call();
					res.data[i].status = parseInt(lotteryInfo.status);
				}

				if (res.data[i].status === 0 || res.data[i].status === 4) {
					try {
						const prizeInfo = await lottery.methods.getPrize(res.data[i].ticket_id).call();
						res.data[i].prize = Web3.utils.fromWei(prizeInfo + '', 'ether');
					} catch{
						res.data[i].prize = undefined;
					}
				}
			}
			setTickets(res.data);
		})
	}

	useEffect(() => {
		getMyTickets();
	}, [account, limit, offset])

	const onClickClaim = (ticketId: any) => {
		dispatch(setIsLoading(true));
		Wallet.sendTransaction(
			lottery.methods.claimTicket(ticketId), 
			account)
			.then((res: any) => {
					dispatch(setIsLoading(false));
					Swal.fire("Ticket claimed successfully!");
			})
			.catch((ex) => {
					dispatch(setIsLoading(false));
					Swal.fire("Ticket claim failed!");
					console.log(ex);
			})
	}

	const onPrev = () => {
		if (offset > 5) {
			setOffset(offset - 5);
		}
	}

	const onNext = () => {
		if (offset < total - 5) {
			setOffset(offset + 5);
		}
	}

	const onFirst = () => {
		setOffset(0);
	}

	const onLast = () => {
		setOffset(total - total % 5);
	}

  return (
    <div className="feature two">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-xl-7">
                    <div className="section-head wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s" style={{visibility: "visible", animationDuration: "0.3s", animationDelay: "0.3s", animationName: "fadeInUp"
                    }}>
                        <div className="ml-auto mr-auto lot-card" style={{width: 'fit-content'}}>
                            <div className="section-head">
                                <h2 className="title">My Tickets</h2>
                                <p className="text">
                                    Check your tickets and rewards
                                </p>
                            </div>
                            <div className="section-rounds">
															{
																tickets.map(ticket => {
																	return (
																		<div className='ticket-table'>
																			<div className='flex-row'>
																					<p>Number:</p>
																					<p className='number'>
																						{
																							ticket.ticketNums.map((number: any, index: number) => {
																								if (index === ticket.ticketNums.length - 1)
																									return `${number}`;
																								else
																									return `${number}/`;
																							})
																						}
																					</p>
																			</div>
																			<div className='flex-row'>
																					<p>Wining number :</p>
																					<p className='number'> 
																						{
																							ticket.finalNumber && ticket.finalNumber.map((number: any, index: number) => {
																								if (index === ticket.finalNumber.length - 1)
																									return `${number}`;
																								else
																									return `${number}/`;
																							})
																						}
																					</p>
																			</div>
																			<div className='flex-row'>
																					<p>Round: {ticket.round}</p>
																					<p>Prize: {ticket.status != 0 && ticket.status != 4 ? '-' : ticket.prize}</p> 
																			</div>
																			<div className='flex-row'>
																					<button className={`btn-status-${ticket.status}`} onClick={() => onClickClaim(ticket.ticket_id)} disabled={ticket.status !== 0}>
																						{
																							ticket.status === 0 ? 'Claim Now' :
																							ticket.status === 4 ? 'Claimed'	: 'On-Going'
																						}
																					</button> 
																			</div>
                                		</div>
																	)
																})
															}
                            </div>
                            <div className="section-pagination">
                                <a onClick={onFirst} className="ml-auto">&lt;&lt;</a>
                                <a onClick={onPrev} >&lt;</a>
                                <a onClick={onNext} >&gt;</a>
                                <a onClick={onLast} className="mr-auto">&gt;&gt;</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-5 d-none d-xl-block">
                    <div className="pic">
                        <img src="./media/feature-2.png" alt="" className="fimg-1"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyHistory