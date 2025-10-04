type Props = {
  isConnected: Boolean
  errorMessage: String | null
}

export default function MidiInputDetection(props: Props) {
  return (
    <div>
      <div>
        <h3>{props.isConnected ? 'Device Connected' : 'Device Disconnected'}</h3>
      </div>
      {props.errorMessage ?
        <h3>Error: {props.errorMessage}</h3> :
        <></>
      }
    </div>
  )
}
