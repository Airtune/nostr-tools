import {Event, finishEvent, Kind, verifySignature} from './event.ts'

export interface ChannelMetadata {
  name: string
  about: string
  picture: string
}

export interface ChannelCreateEventTemplate {
  /* JSON string containing ChannelMetadata as defined for Kind 40 and 41 in nip-28. */
  content: string | ChannelMetadata
  created_at: number
  tags?: string[][]
}

const channelCreateEvent = (t: ChannelCreateEventTemplate, privateKey: string): Event<Kind.ChannelCreation> | undefined => {
  let content: string;
  if (typeof(t.content) === 'object') {
    content = JSON.stringify(t.content)
  } else if (typeof(t.content) == 'string') {
    content = t.content
  } else {
    return undefined
  }

  return finishEvent({
    kind: Kind.ChannelCreation,
    tags: [
      ...(t.tags ?? [])
    ],
    content: content,
    created_at: t.created_at,
  }, privateKey)
}
