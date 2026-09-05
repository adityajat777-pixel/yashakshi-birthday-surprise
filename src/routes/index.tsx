import { createFileRoute } from '@tanstack/react-router'
import {
  CakeSlice,
  Heart,
  Lightbulb,
  Mail,
  Music2,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react'
import type { CSSProperties } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: BirthdaySurprise,
})

const letter = `Happy birthday, Yashakshi. 🤍

Okay… today I'm probably going to say a little more than I usually do.

And honestly, I've rewritten this in my head so many times because there's a difference between having feelings and actually knowing how to put them into words.

But it's your birthday.

So maybe today I shouldn't be scared of the words.

I still remember that first time I noticed you.

It's strange how some moments don't look important when they're happening.

Nothing dramatic happened.

No movie scene. No background music. Nothing.

Bas… I saw you.

And somehow, something about that moment stayed.

I can't even properly explain what it was.

It wasn't just “she's pretty.”

It was more like…

“there's something about this girl.”

And the weirdest part is that feeling never really went away.

If anything, the more I've gotten to know you, the more I understand why I felt it that day.

There's a softness in you that I don't know how to describe.

Something that feels very… untouched.

Maybe that's why sometimes when I look at you, my mind doesn't even go to the usual things people notice first.

It goes somewhere else.

I noticed these little things in school.

The way you talk.

The way you react to things.

The little expressions you probably don't even realise you're making.

And somehow all of those tiny things started becoming important to me.

Pata nahi kaise.

I just know they did.

And there's something else I've never really known how to tell you.

Sometimes I wish you could borrow my eyes for just a minute.

Not because I want you to see how I see you physically…

but because I wish you could experience, even for a moment, what your presence feels like from where I'm standing.

Maybe then you'd understand why I sometimes struggle to explain myself.

Because “you're beautiful” feels ridiculously small compared to what I actually mean.

There's a certain kind of beauty that isn't about a face.

It's the kind that makes an ordinary moment feel different simply because that person is somewhere inside it.

And somehow…

you became that kind of person for me.

I know this sounds crazy.

Especially because I don't even know when it happened.

But there have been moments when my day wasn't exactly going the way I wanted…

and then somehow talking to you made it feel a little less heavy.

You probably didn't even know you were doing it.

That's the funny thing.

You never had to try.

You just existed as yourself.

And somehow that was enough.

Maybe that's why I called you a ray of hope once.

I don't think I ever properly explained what I meant by that.

It wasn't some dramatic line.

It was actually one of the simplest things I've felt.

Sometimes when everything inside your head feels unnecessarily loud, there are certain people whose presence makes things quiet for a while.

For me, you've become one of those people.

And yeah…

there's a part of me that's scared of saying all this.

Because once you put something real into words, you can't take it back.

You can't hide behind a joke.

You can't pretend you didn't mean it.

And maybe that's why there are things I've wanted to tell you when you were awake, but couldn't.

Not because I didn't want to.

Because I cared too much about what your answer might be.

I've had this stupid thought in my head for a while…

what if I lose something before I even get the chance to know what it could have been?

And maybe that's what scares me.

But I don't want that fear to be the thing that makes me dishonest about how much I appreciate you.

So I'm telling you this instead:

I'm really grateful that our paths crossed.

I'm grateful for every random conversation that somehow became memorable.

For every stupid little moment.

For every time you made me smile without knowing.

For every time I thought “why am I still awake talking to this girl?” and stayed anyway. 😭

And if someday you ask me what exactly changed…

I probably still won't have a perfect answer.

Maybe nothing changed all at once.

Maybe it was just a hundred tiny moments.

A hundred little conversations.

A hundred times of thinking about something and wanting to tell you.

Until one day…

you weren't just someone I knew anymore.

You were someone I genuinely didn't want to lose.

And today, more than anything, I want you to know one thing:

I hope you never become smaller in your own eyes just because you can't see what someone else sees in you.

I hope you keep that softness.

I hope life doesn't make you hard.

I hope you find people who appreciate the parts of you that you don't think are worth noticing.

And I hope this year gives you reasons to look back and smile at the person you were becoming.

You deserve that.

Actually…

you deserve a lot more than I know how to put into a birthday message.

So I'm not going to try anymore.

I'll just say it simply.

I'm really, really glad you exist.

And I'm even more glad that, somehow, I got to know you.

Happy birthday. 🤍

And Yashakshi…

if someday I finally get brave enough to tell you all of this while you're sitting right in front of me,

please don't make fun of me for how long it took. 😭

For now, just have the most beautiful day.

Not because it's your birthday.

But because you deserve beautiful days even when it's not.

Happy birthday, you my 🐥♥️🌹`

type BurstItem = {
  id: number
  emoji: string
  left: number
  delay: number
  duration: number
  drift: number
  size: number
}

function BirthdaySurprise() {
  const [step, setStep] = useState(1)
  const [lightsOn, setLightsOn] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [cakeCut, setCakeCut] = useState(false)
  const [noShake, setNoShake] = useState(false)
  const [scrolling, setScrolling] = useState(true)
  const [burst, setBurst] = useState<BurstItem[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)

  const progress = Math.min(step, 10)

  const ambientDecor = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        symbol: ['✦', '·', '♡', '✧'][index % 4],
        left: (index * 37) % 97,
        top: (index * 53) % 92,
        delay: (index % 7) * -0.8,
      })),
    [],
  )

  useEffect(() => {
    if (step !== 10 || !scrolling) return

    const container = letterRef.current
    if (!container) return

    let frame = 0
    let lastTime = performance.now()
    const words = letter.trim().split(/\s+/).length
    const readingTime = (words / 205) * 60 * 1000

    const scroll = (now: number) => {
      const maxScroll = container.scrollHeight - container.clientHeight
      if (maxScroll <= 0 || container.scrollTop >= maxScroll) {
        setScrolling(false)
        return
      }

      const elapsed = now - lastTime
      lastTime = now
      container.scrollTop += (maxScroll / readingTime) * elapsed
      frame = requestAnimationFrame(scroll)
    }

    const timeout = window.setTimeout(() => {
      lastTime = performance.now()
      frame = requestAnimationFrame(scroll)
    }, 4500)

    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [step, scrolling])

  const goTo = (nextStep: number) => {
    setStep(nextStep)
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 20)
  }

  const turnLightsOn = () => {
    setLightsOn(true)
    window.setTimeout(() => goTo(5), 650)
  }

  const playMusic = async () => {
    try {
      await audioRef.current?.play()
      setMusicStarted(true)
      setMusicPlaying(true)
    } catch {
      setMusicPlaying(false)
    }
    goTo(6)
  }

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      await audio.play()
      setMusicPlaying(true)
    } else {
      audio.pause()
      setMusicPlaying(false)
    }
  }

  const ignoreNo = () => {
    setNoShake(true)
    window.setTimeout(() => setNoShake(false), 550)
  }

  const flyBalloons = () => {
    const emojis = ['🎈', '🎈', '🎈', '🐥', '🌹']
    const items = Array.from({ length: 58 }, (_, index) => ({
      id: Date.now() + index,
      emoji: emojis[index % emojis.length],
      left: Math.random() * 100,
      delay: Math.random() * 1.4,
      duration: 4.2 + Math.random() * 3.4,
      drift: -70 + Math.random() * 140,
      size: 24 + Math.random() * 26,
    }))
    setBurst(items)
    window.setTimeout(() => goTo(8), 1200)
    window.setTimeout(() => setBurst([]), 8500)
  }

  return (
    <main className={lightsOn ? 'birthday-app lights-on' : 'birthday-app'}>
      <audio
        ref={audioRef}
        src="/audio/birthday-piano.mp3"
        preload="auto"
        onEnded={() => setMusicPlaying(false)}
      />

      <div className="paper-grain" aria-hidden="true" />
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />

      {ambientDecor.map((item) => (
        <span
          className="ambient-symbol"
          key={item.id}
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            animationDelay: `${item.delay}s`,
          }}
          aria-hidden="true"
        >
          {item.symbol}
        </span>
      ))}

      {burst.map((item) => (
        <span
          className="flying-emoji"
          key={item.id}
          style={
            {
              left: `${item.left}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              fontSize: `${item.size}px`,
              '--drift': `${item.drift}px`,
            } as CSSProperties
          }
          aria-hidden="true"
        >
          {item.emoji}
        </span>
      ))}

      {step > 1 && step < 10 && (
        <div className="progress-shell" aria-label={`Step ${progress} of 10`}>
          <span className="progress-heart"><Heart size={13} fill="currentColor" /></span>
          <div className="progress-track">
            <span style={{ width: `${(progress / 10) * 100}%` }} />
          </div>
        </div>
      )}

      {musicStarted && step >= 6 && (
        <div className="music-pill">
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={musicPlaying ? 'Pause music' : 'Play music'}
          >
            {musicPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          </button>
          <span className={musicPlaying ? 'equalizer' : 'equalizer paused'} aria-hidden="true"><i /><i /><i /><i /></span>
          <span>Dhun · piano cover</span>
          <button
            type="button"
            onClick={() => {
              if (audioRef.current) audioRef.current.muted = !muted
              setMuted((value) => !value)
            }}
            aria-label={muted ? 'Unmute music' : 'Mute music'}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      )}

      <section className={`scene scene-${step}`} key={step}>
        {step === 1 && (
          <div className="intro-card">
            <span className="eyebrow">a tiny celebration, made with a lot of heart</span>
            <div className="chick-orbit" aria-hidden="true"><span>🐥</span></div>
            <h1>Happyyyyy<br />birthdayyyyyyy<br /><em>my 🐥</em></h1>
            <p>
              I created something special for you since I cannot celebrate your
              birthday with you physically. So, let&apos;s celebrate it virtually.
            </p>
            <button className="primary-button" type="button" onClick={() => goTo(2)}>
              Open your surprise <Sparkles size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="question-card">
            <span className="mini-heart">♥</span>
            <p className="kicker">one important question</p>
            <h2>Do you want to see<br />what I made?</h2>
            <div className="button-row">
              <button className="primary-button" type="button" onClick={() => goTo(4)}>
                Yes, show me <Heart size={18} fill="currentColor" />
              </button>
              <button className="ghost-button" type="button" onClick={() => goTo(3)}>
                No
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={`question-card pleading-card ${noShake ? 'shake' : ''}`}>
            <div className="big-face" aria-hidden="true">🥺</div>
            <p className="kicker">wait, that was the wrong button</p>
            <h2>But… why?<br />Please say yes!</h2>
            <div className="button-row">
              <button className="primary-button" type="button" onClick={() => goTo(4)}>
                Okay, yes <Heart size={18} fill="currentColor" />
              </button>
              <button className="ghost-button no-button" type="button" onClick={ignoreNo}>
                Still no
              </button>
            </div>
            <span className="tiny-note">psst… only “yes” works here</span>
          </div>
        )}

        {step === 4 && (
          <div className="switch-scene">
            <div className="hanging-bulb" aria-hidden="true">
              <span className="cord" />
              <span className="bulb"><Lightbulb size={62} strokeWidth={1.2} /></span>
            </div>
            <p className="kicker">first things first</p>
            <h2>It&apos;s a little dark in here…</h2>
            <button className="primary-button warm-button" type="button" onClick={turnLightsOn}>
              Lights on <Lightbulb size={19} />
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="vinyl-scene">
            <div className="vinyl" aria-hidden="true">
              <div className="vinyl-label">for<br />you</div>
            </div>
            <p className="kicker">this needs a soundtrack</p>
            <h2>Press play,<br />birthday girl.</h2>
            <button className="primary-button" type="button" onClick={playMusic}>
              Play music <Music2 size={19} />
            </button>
          </div>
        )}

        {step === 6 && (
          <div className="decorate-scene">
            <span className="tape tape-left" aria-hidden="true" />
            <span className="tape tape-right" aria-hidden="true" />
            <p className="kicker">music: on · mood: perfect</p>
            <h2>The room still looks<br />a little plain.</h2>
            <div className="doodle-line" aria-hidden="true">✦ ─── ♡ ─── ✦</div>
            <button className="primary-button" type="button" onClick={() => goTo(7)}>
              Decorate <Sparkles size={19} />
            </button>
          </div>
        )}

        {step === 7 && (
          <div className="party-scene">
            <div className="bunting" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, index) => <i key={index} />)}
            </div>
            <div className="birthday-banner">
              <span>Happy birthday to my</span>
              <strong>favourite baddie</strong>
              <span className="banner-icons">💅 🌹</span>
            </div>
            <button className="primary-button" type="button" onClick={flyBalloons}>
              Fly the balloons <span aria-hidden="true">🎈</span>
            </button>
          </div>
        )}

        {step === 8 && (
          <div className="party-scene cake-invite">
            <div className="mini-banner">Happy birthday to my favourite baddie 💅🌹</div>
            <div className="balloon-cluster" aria-hidden="true">
              <span>🎈</span><span>🌹</span><span>🐥</span><span>🎈</span>
            </div>
            <p className="kicker">the room is ready</p>
            <h2>There&apos;s only one thing<br />left to do…</h2>
            <button className="primary-button" type="button" onClick={() => goTo(9)}>
              Cut the cake <CakeSlice size={19} />
            </button>
          </div>
        )}

        {step === 9 && (
          <div className="cake-scene">
            <p className="kicker">make a wish, Yashakshi</p>
            <div className={cakeCut ? 'cake cut' : 'cake'} aria-label="A pink birthday cake">
              <div className="candle-flame" />
              <div className="candle">♡</div>
              <div className="cake-top"><span /><span /><span /><span /><span /></div>
              <div className="cake-layer cake-layer-one">HAPPY</div>
              <div className="cake-layer cake-layer-two">BIRTHDAY</div>
              <div className="cake-plate" />
              {cakeCut && <div className="cake-slice-piece" />}
            </div>
            {!cakeCut ? (
              <button className="primary-button" type="button" onClick={() => setCakeCut(true)}>
                Cut the cake <CakeSlice size={19} />
              </button>
            ) : (
              <button className="primary-button reveal-button" type="button" onClick={() => goTo(10)}>
                Receive a message <Mail size={19} />
              </button>
            )}
          </div>
        )}

        {step === 10 && (
          <div className="letter-scene">
            <div className="letter-heading">
              <span className="kicker">one last thing, from my heart</span>
              <h2>For Yashakshi</h2>
              <span className="letter-flower">🌹</span>
            </div>
            <div
              className="letter-paper"
              ref={letterRef}
              onWheel={() => setScrolling(false)}
              onTouchStart={() => setScrolling(false)}
            >
              <div className="letter-copy">{letter}</div>
              <div className="letter-signoff">made for you, with all my heart ♡</div>
            </div>
            <div className="letter-controls">
              <span>{scrolling ? 'Reading along with you…' : 'Auto-scroll paused'}</span>
              <button type="button" onClick={() => setScrolling((value) => !value)}>
                {scrolling ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
                {scrolling ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default BirthdaySurprise
