/*
 * Copyright 2019 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Observable } from 'rxjs';
import { Address } from '../model/account/Address';
import { BlockInfo } from '../model/blockchain/BlockInfo';
import { AggregateTransaction } from '../model/transaction/AggregateTransaction';
import { CosignatureSignedTransaction } from '../model/transaction/CosignatureSignedTransaction';
import { Transaction } from '../model/transaction/Transaction';
import { TransactionStatusError } from '../model/transaction/TransactionStatusError';

/**
 * Listener service
 */
export interface IListener {

    /**
     * Open web socket connection.
     * @returns Promise<Void>
     */
    open(): Promise<void>;

    /**
     * returns a boolean that repressents the open state
     * @returns a boolean
     */
    isOpen(): boolean;

    /**
     * Close web socket connection.
     * @returns void
     */
    close(): void;

    /**
     * Returns an observable stream of BlockInfo.
     * Each time a new Block is added into the blockchain,
     * it emits a new BlockInfo in the event stream.
     *
     * @return an observable stream of BlockInfo
     */
    newBlock(): Observable<BlockInfo>;

    /**
     * Returns an observable stream of Transaction for a specific address.
     * Each time a transaction is in confirmed state an it involves the address,
     * it emits a new Transaction in the event stream.
     *
     * @param address address we listen when a transaction is in confirmed state
     * @param transactionHash transactionHash for filtering multiple transactions
     * @return an observable stream of Transaction with state confirmed
     */

    confirmed(address: Address, transactionHash?: string): Observable<Transaction>;

    /**
     * Returns an observable stream of Transaction for a specific address.
     * Each time a transaction is in unconfirmed state an it involves the address,
     * it emits a new Transaction in the event stream.
     *
     * @param address address we listen when a transaction is in unconfirmed state
     * @return an observable stream of Transaction with state unconfirmed
     */
     unconfirmedAdded(address: Address): Observable<Transaction>;

    /**
     * Returns an observable stream of Transaction Hashes for specific address.
     * Each time a transaction with state unconfirmed changes its state,
     * it emits a new message with the transaction hash in the event stream.
     *
     * @param address address we listen when a transaction is removed from unconfirmed state
     * @return an observable stream of Strings with the transaction hash
     */
    unconfirmedRemoved(address: Address): Observable<string>;

    /**
     * Return an observable of {@link AggregateTransaction} for specific address.
     * Each time an aggregate bonded transaction is announced,
     * it emits a new {@link AggregateTransaction} in the event stream.
     *
     * @param address address we listen when a transaction with missing signatures state
     * @param transactionHash transactionHash for filtering multiple transactions
     * @return an observable stream of AggregateTransaction with missing signatures state
     */
    aggregateBondedAdded(address: Address, transactionHash?: string): Observable<AggregateTransaction>;

    /**
     * Returns an observable stream of Transaction Hashes for specific address.
     * Each time an aggregate bonded transaction is announced,
     * it emits a new message with the transaction hash in the event stream.
     *
     * @param address address we listen when a transaction is confirmed or rejected
     * @return an observable stream of Strings with the transaction hash
     */
    aggregateBondedRemoved(address: Address): Observable<string>;

    /**
     * Returns an observable stream of {@link TransactionStatusError} for specific address.
     * Each time a transaction contains an error,
     * it emits a new message with the transaction status error in the event stream.
     *
     * @param address address we listen to be notified when some error happened
     * @return an observable stream of {@link TransactionStatusError}
     */
    status(address: Address): Observable<TransactionStatusError>;

    /**
     * Returns an observable stream of {@link CosignatureSignedTransaction} for specific address.
     * Each time a cosigner signs a transaction the address initialized,
     * it emits a new message with the cosignatory signed transaction in the even stream.
     *
     * @param address address we listen when a cosignatory is added to some transaction address sent
     * @return an observable stream of {@link CosignatureSignedTransaction}
     */
    cosignatureAdded(address: Address): Observable<CosignatureSignedTransaction>;

}
