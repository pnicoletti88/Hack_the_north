import React, { Component } from 'react';
import cx from 'classnames';
import styles from './Reconcillation.module.css';
import { mockRecData } from '../../util';

class Reconcillation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    getData = async () => {
        const result = await mockRecData();
        this.setState({
            ...result,
            isLoading: false
        })
    }

    componentDidMount(){
        this.getData();
    }
    
    render(){
        const { 
            isLoading,
            blockRev,
            blockExp,
            freshRev,
            freshExp
         } = this.state;
        if(isLoading){
            return null;
        }

        const netBlock = blockRev - blockExp;
        const netFresh = freshRev - freshExp;

        const isSync = netBlock === netFresh;

        return (
            <div className={styles.main}>
                <div className={styles.row}>
                    <p className={styles.name}></p>
                    <p className={styles.title}>Blockchain Data</p>
                    <p className={styles.title}>FreshBooks Data</p>
                </div>
                <div className={styles.row}>
                    <p className={styles.name}>Revenue</p>
                    <p className={styles.value}>${blockRev}</p>
                    <p className={styles.value}>${freshRev}</p>
                </div>
                <div className={styles.row}>
                    <p className={styles.name}>Expenses</p>
                    <p className={styles.value}>(${blockExp})</p>
                    <p className={styles.value}>(${freshExp})</p>
                </div>
                <div className={cx(styles.row, styles.line)}>
                    <p className={styles.name}>Total</p>
                    <div className={isSync ? styles.green : styles.red}>
                        <p className={styles.value}>${netBlock >= 0 ? netBlock : `(${netBlock})`}</p>
                        <p className={styles.value}>${netFresh >= 0 ? netFresh : `(${netFresh})`}</p>
                    </div>
                </div>
            </div>
        );
    }
}

Reconcillation.propTypes = {
    
}
Reconcillation.defaultProps = {
    
}

export default Reconcillation;