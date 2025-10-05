import styles from './MidiInputDetection.module.css';

type Props = {
  isConnected: Boolean
  errorMessage: String | null
  connectionfunc: () => void
  fullError: any
}

export default function MidiInputDetection(props: Props) {
  return (
    <div className={styles.MidiInputDetectionWrapper}>
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
