import styles from './MidiDeviceSelection.module.css';

type Props = {
  isConnected: Boolean
  errorMessage: String | null
  connectionfunc: () => void
  fullError: any
}

export default function MidiDeviceSelection(props: Props) {
  return (
    <div className={styles.MidiDeviceSelectionWrapper}>
      <div>
        <h3>{props.isConnected ? 'Device Connected' : 'Device Disconnected'}</h3>
        {!props.isConnected ?
          <button onClick={props.connectionfunc}>Connect</button> :
          <></>
        }
      </div>
      {props.errorMessage ?
        <>
          <h3>Error: {props.errorMessage}</h3>
          <h3>{props.fullError ? props.fullError.toString() : ''}</h3>
        </> :
        <></>
      }
    </div>
  )
}
