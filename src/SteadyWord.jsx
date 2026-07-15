import React, { useState, useEffect, useRef } from "react";

/* ============================================================================
 *  A STEADY WORD
 *  Encouragement anchored in the sovereignty of God, grounded in
 *  A. W. Pink, "The Sovereignty of God" (1918 / 1921 / 1929, public domain).
 *  Scripture is quoted from the King James Version (public domain).
 * ========================================================================== */

/* --- Pink's themes. Every quote is verbatim from the original (public-domain)
 *     editions. Kept to the accessible, comfort-bearing side of the book. --- */
const PINK_THEMES = {
  throne: { label: "On the throne", chapter: "Foreword",
    quote: "Nothing is so tranquillising and so stabilising as the assurance that the Lord Himself is on the throne of the universe, working all things after the counsel of His own will." },
  hand: { label: "All from His hand", chapter: "Foreword",
    quote: "Faith ... endures the disappointments, the hardships, and the heartaches of life by recognizing that all comes from the hand of Him who is too wise to err and too loving to be unkind." },
  peace: { label: "Peace, be still", chapter: "Chapter 10",
    quote: "To the one who has really yielded himself to this blessed truth there will presently be heard that Voice saying ... 'Peace be still'; and the tempestuous flood within will be quieted." },
  shepherd: { label: "Held in His hand", chapter: "Chapter 12",
    quote: "Here am I, a poor, helpless, senseless sheep, yet am I secure in the hand of Christ. None can pluck me thence, because the hand that holds me is that of the Son of God." },
  comfort: { label: "Comfort in sorrow", chapter: "Chapter 12",
    quote: "The doctrine of God's sovereignty is one that is full of consolation and imparts great peace to the Christian." },
  rest: { label: "A sure resting-place", chapter: "Chapter 12",
    quote: "It provides a sure resting-place for our hearts, and that place, the perfections of the Sovereign Himself." },
  triumph: { label: "The triumph of good", chapter: "Chapter 12",
    quote: "It assures us of the certain triumph of good over evil." },
  reigns: { label: "He reigns still", chapter: "Introduction",
    quote: "God still lives, that God still observes, that God still reigns." },
  anchor: { label: "An anchor in the storm", chapter: "Chapter 12",
    quote: "It is designed as the sheet-anchor for our souls amid the storms of life." },
  cordial: { label: "A cordial for the spirit", chapter: "Chapter 12",
    quote: "The doctrine of God's Sovereignty is a Divine cordial to refresh our spirits." },
  future: { label: "Safe in the unknown", chapter: "Chapter 12",
    quote: "It affords comfort for the present and a sense of security respecting the unknown future." },
  patience: { label: "Patience in adversity", chapter: "Chapter 12",
    quote: "It produces gratitude in prosperity and patience in adversity." },
  lines: { label: "Pleasant places", chapter: "Foreword",
    quote: "No matter what may be our circumstances or surroundings ... we shall be enabled to say, 'The lines are fallen unto me in pleasant places.'" },
  godhood: { label: "God is God", chapter: "Chapter 1",
    quote: "To say that God is sovereign is to declare that God is God." },
  taketh: { label: "His to give, His to take", chapter: "Chapter 10",
    quote: "How comforting to learn that it is He, and not the Devil, who taketh away our loved ones ... the number of our days is with Him." },
  surrender: { label: "The secret of peace", chapter: "Chapter 10",
    quote: "To bow before the Sovereign will of God is one of the great secrets of peace and happiness." },
  occupied: { label: "Eyes on Him", chapter: "Foreword",
    quote: "So long as we are occupied with any other object than God Himself there will be neither rest for the heart nor peace for the mind." },
  faith: { label: "The man of faith", chapter: "Introduction",
    quote: "The man of faith brings in God, looks at everything from His standpoint, estimates values by spiritual standards, and views life in the light of eternity." },
  calm: { label: "Calm in the storm", chapter: "Introduction",
    quote: "He receives whatever comes as from the hand of God; his heart is calm in the midst of the storm." },
  purposed: { label: "Nothing by chance", chapter: "Chapter 3",
    quote: "Nothing in all the vast universe can come to pass otherwise than God has eternally purposed." },
  steadfast: { label: "Sure and steadfast", chapter: "Chapter 3",
    quote: "Here is a foundation of faith. Here is a resting place for the intellect. Here is an anchor for the soul, both sure and steadfast." },
  ruling: { label: "Not fate, but the Lord", chapter: "Chapter 3",
    quote: "It is not blind fate, unbridled evil, man or Devil, but the Lord Almighty who is ruling the world, ruling it according to His own good pleasure and for His own eternal glory." },
  foundation: { label: "A foundation unshaken", chapter: "Chapter 12",
    quote: "The Sovereignty of God is a foundation that nothing can shake, and is more firm than the heavens and earth." },
  forgood: { label: "Ordered for good", chapter: "Chapter 12",
    quote: "All things are so ordered by Him that they are made to minister to our ultimate good." },
  father: { label: "The Sovereign is my Father", chapter: "Chapter 10",
    quote: "The realization that the Sovereign Himself is my Father ought to overwhelm the heart, and cause me to bow before Him in adoring worship." },
  gaze: { label: "Gaze upon the Sovereign", chapter: "Chapter 10",
    quote: "To truly recognise the Sovereignty of God is, therefore, to gaze upon the Sovereign Himself." },
  silver: { label: "Silver all through", chapter: "Chapter 12",
    quote: "To the one who delights in the Sovereignty of God the clouds not only have a 'silver lining' but they are silver all through, the darkness only serving to offset the light." },
  government: { label: "He governs all", chapter: "Chapter 3",
    quote: "The Lord God omnipotent reigneth. His government is exercised over inanimate matter, over the brute beasts, over the children of men, over angels good and evil, and over Satan himself." },
  love: { label: "Thoughts of love", chapter: "Chapter 12",
    quote: "He has naught but thoughts of love toward His own." },
  security: { label: "Security in danger", chapter: "Chapter 12",
    quote: "It affords the saints a sense of security in danger." },
  centre: { label: "The centre of gravity", chapter: "Foreword",
    quote: "It is the centre of gravity in the system of Christian truth: the sun around which all the lesser orbs are grouped." },
  providence: { label: "The interpreter of providence", chapter: "Foreword",
    quote: "The doctrine which is the key to history, the interpreter of Providence, the warp and woof of Scripture." },
};

/* --- What you're facing. The accessible front door. --- */
const CATEGORIES = [
  { id: "anxiety", label: "Anxiety & fear", blurb: "When worry runs ahead of you." },
  { id: "grief", label: "Grief & loss", blurb: "When someone or something is gone." },
  { id: "decisions", label: "Decisions & uncertainty", blurb: "When the way ahead is unclear." },
  { id: "suffering", label: "Suffering & pain", blurb: "When it simply hurts." },
  { id: "waiting", label: "Waiting", blurb: "When nothing seems to move." },
  { id: "lonely", label: "Loneliness", blurb: "When you feel unseen." },
  { id: "weary", label: "Weariness & burnout", blurb: "When you have nothing left." },
  { id: "guilt", label: "Guilt & regret", blurb: "When you cannot undo it." },
  { id: "control", label: "Out of control", blurb: "When everything feels unruly." },
  { id: "gratitude", label: "Gratitude & praise", blurb: "When your heart wants to give thanks." },
  { id: "future", label: "Fear of the future", blurb: "When tomorrow feels uncertain." },
  { id: "change", label: "Change & transition", blurb: "When the ground is shifting." },
  { id: "illness", label: "Illness & health", blurb: "When the body is failing." },
  { id: "provision", label: "Money & provision", blurb: "When you wonder how it gets covered." },
  { id: "relationships", label: "Strained relationships", blurb: "When a bond is broken or tense." },
  { id: "family", label: "Family & parenting", blurb: "When you carry those you love." },
  { id: "anger", label: "Anger & injustice", blurb: "When something is not right." },
  { id: "temptation", label: "Temptation", blurb: "When you feel the pull to give in." },
  { id: "doubt", label: "Doubt & distance", blurb: "When God feels far or silent." },
  { id: "death", label: "Death & the hope of heaven", blurb: "When you face mortality." },
  { id: "overwhelm", label: "Overwhelmed", blurb: "When it is all too much at once." },
  { id: "comparison", label: "Comparison & not enough", blurb: "When you feel behind or less than." },
];

/* --- The library. Scripture is KJV; reflection and prayer are original,
 *     written in Pink's warm, accessible spirit. --- */
const WORDS = [
  { id: "w01", themeId: "throne", cat: ["anxiety"], scripture: "What time I am afraid, I will trust in thee.", reference: "Psalm 56:3",
    encouragement: "Courage was never the price of admission to God's care. When the dread climbs, let it be a signal to lean rather than a verdict to believe — and in that very moment, hand the weight to the One already seated above all that frightens you.",
    prayer: "Lord, when I am afraid, I will trust You. Hold what I cannot." },
  { id: "w02", themeId: "security", cat: ["anxiety", "decisions"], scripture: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.", reference: "Isaiah 41:10",
    encouragement: "Read the promise closely: its pledge is His company in the trouble, more than the removal of it. He is already standing in your tomorrow, at a door you have not yet reached — and whatever meets you there will meet Him first.",
    prayer: "Father, when I dread tomorrow, remind me You are already there." },
  { id: "w03", themeId: "hand", cat: ["anxiety", "control"], scripture: "Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself.", reference: "Matthew 6:34",
    encouragement: "Most of what weighs on you has not yet happened. Tomorrow's grace has not arrived because today you have no use for it — but it will be waiting the moment you do. Only this day is asked of you, and this day He will carry.",
    prayer: "Lord, I lay down tomorrow. Give me only what I need for today." },
  { id: "w04", themeId: "peace", cat: ["anxiety", "control"], scripture: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.", reference: "Philippians 4:6",
    encouragement: "Worry rehearses the problem on a loop; prayer sets it down. Try doing the second instead of the first: tell Him plainly what you need, and let a peace that makes no earthly sense take up its post at the door of your heart.",
    prayer: "God, here is what I have been carrying. I give it to You, and I ask for Your peace." },

  { id: "w05", themeId: "comfort", cat: ["grief", "lonely"], scripture: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.", reference: "Psalm 34:18",
    encouragement: "A broken heart is the very address where God arrives. He keeps no distance from the shattered places; He moves toward them. However much you feel in pieces, that is precisely where He draws near.",
    prayer: "Draw near to my broken heart, O God; I need You close." },
  { id: "w06", themeId: "shepherd", cat: ["grief", "suffering"], scripture: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.", reference: "Psalm 23:4",
    encouragement: "You are walking through the valley, not setting up house in it; there is another side, and the Shepherd is leading you toward it. Even here in the shadow, He has not let go of your hand.",
    prayer: "Shepherd, walk with me through this valley, and lead me out the other side." },
  { id: "w07", themeId: "lines", cat: ["grief"], scripture: "Weeping may endure for a night, but joy cometh in the morning.", reference: "Psalm 30:5",
    encouragement: "The night of tears is real, and He will not hurry you through it. Yet the morning belongs to Him, and it is already on its way — never once depending on your strength to break, only on His faithfulness to send it.",
    prayer: "Hold me through the night of tears until Your morning breaks." },

  { id: "w08", themeId: "throne", cat: ["decisions"], scripture: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.", reference: "Proverbs 3:5-6",
    encouragement: "You can take the next step without seeing the whole road. What God promises is a faithful Guide more than a finished map — so bring Him the decision, hold it open-handed, and trust Him to steer even your uncertain steps.",
    prayer: "Lord, I cannot see the way, but You can. Direct my path." },
  { id: "w09", themeId: "reigns", cat: ["decisions", "control"], scripture: "A man's heart deviseth his way: but the LORD directeth his steps.", reference: "Proverbs 16:9",
    encouragement: "Plan as wisely as you can, and then rest. No wrong turn of yours is powerful enough to wreck what God intends, and no wandering takes you off His watch; He has a way of directing the very steps you thought were yours alone.",
    prayer: "Father, I will plan and then trust. Direct my steps where my planning falls short." },

  { id: "w10", themeId: "hand", cat: ["suffering"], scripture: "It is the LORD: let him do what seemeth him good.", reference: "1 Samuel 3:18",
    encouragement: "This did not slip past Him to reach you. It came through His hands — too wise to make a mistake, too loving to be cruel. You may never understand it, but you can trust the One it came from.",
    prayer: "Father, I receive this from Your hand. Help me trust that You are too wise to err." },
  { id: "w11", themeId: "silver", cat: ["suffering", "control"], scripture: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.", reference: "Romans 8:28",
    encouragement: "The promise is subtler than 'everything is good.' It is that nothing is wasted. What stands in front of you is no loose thread but part of a design larger and kinder than you can see — and the One holding the loom is holding you too.",
    prayer: "Father, weave even this into the good You are working; I trust the loom to You." },
  { id: "w12", themeId: "anchor", cat: ["suffering", "waiting"], scripture: "For our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory.", reference: "2 Corinthians 4:17",
    encouragement: "It does not feel light, and He knows the full weight of it. Yet set beside what is coming, even this will prove momentary — and in His hands your suffering is quietly doing something that will outlast it forever.",
    prayer: "Lord, hold me in this affliction, and let it not be wasted." },

  { id: "w13", themeId: "patience", cat: ["waiting"], scripture: "Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.", reference: "Psalm 27:14",
    encouragement: "Time spent waiting on God is not time lost. He is at work in the delay, often most where you can see it least — so take courage. The One you are waiting for has never yet been late.",
    prayer: "Lord, strengthen my heart while I wait, and help me wait on You." },
  { id: "w14", themeId: "forgood", cat: ["waiting", "weary"], scripture: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary.", reference: "Isaiah 40:31",
    encouragement: "The strength you have spent is not the only strength on offer. He renews what you could never manufacture — so stop wringing more out of yourself, and draw instead on the supply that comes from Him.",
    prayer: "Renew the strength I cannot summon, for I have spent my own." },
  { id: "w15", themeId: "future", cat: ["waiting", "decisions"], scripture: "For the vision is yet for an appointed time... though it tarry, wait for it; because it will surely come, it will not tarry.", reference: "Habakkuk 2:3",
    encouragement: "What feels overdue to you is right on schedule with Him. He keeps a different clock, and it is never careless. The thing you await has not been forgotten — only timed, by a God who is neither early nor late.",
    prayer: "Lord, I trust Your timing over my own. Help me wait for the appointed time." },

  { id: "w16", themeId: "love", cat: ["lonely"], scripture: "I will never leave thee, nor forsake thee.", reference: "Hebrews 13:5",
    encouragement: "Hold onto this when feeling fails you: He has not left, and He will not. His nearness keeps no rhythm with your awareness of it — on the loneliest day, the God who reigns is closer than your own breath.",
    prayer: "Lord, when I feel alone, remind me You have not left and never will." },
  { id: "w17", themeId: "shepherd", cat: ["lonely", "control"], scripture: "Whither shall I go from thy spirit? or whither shall I flee from thy presence?", reference: "Psalm 139:7",
    encouragement: "Every room you enter, He has entered first; no distance you travel puts you past His reach. You are far less alone than you feel — the Shepherd is already standing in the field you thought was empty.",
    prayer: "When I feel utterly alone, meet me in the empty field, Good Shepherd." },
  { id: "w18", themeId: "love", cat: ["lonely", "grief"], scripture: "And the LORD, he it is that doth go before thee; he will be with thee, he will not fail thee, neither forsake thee: fear not, neither be dismayed.", reference: "Deuteronomy 31:8",
    encouragement: "He goes on ahead and stays beside you at once, unbound by the one place that holds you. So you face neither what is coming nor what is already here on your own; He will not fail you.",
    prayer: "Lord, go before me and stay beside me. Steady my dismayed heart." },

  { id: "w19", themeId: "cordial", cat: ["weary"], scripture: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", reference: "Matthew 11:28",
    encouragement: "Notice the timing of the invitation: come now, heavy-laden, exactly as you are. The rest is not something you achieve before you arrive — it is what He hands you when you come.",
    prayer: "Lord, I come to You tired and heavy. Give me the rest I cannot give myself." },
  { id: "w20", themeId: "cordial", cat: ["weary"], scripture: "He giveth power to the faint; and to them that have no might he increaseth strength.", reference: "Isaiah 40:29",
    encouragement: "Your weariness is the very doorway where He loves to meet you. He waits for no one to gather themselves first; the place you feel yourself running out is the place His strength begins.",
    prayer: "Meet me in my weariness, God; let Your strength begin where mine ends." },
  { id: "w21", themeId: "rest", cat: ["weary"], scripture: "Return unto thy rest, O my soul; for the LORD hath dealt bountifully with thee.", reference: "Psalm 116:7",
    encouragement: "Your heart keeps searching for somewhere solid to stand. There is only one resting-place that will hold: not your circumstances changing, but the unchanging goodness of God Himself. Stop striving, and return there.",
    prayer: "Lord, I stop striving and return to my rest in You. Be my solid ground." },

  { id: "w22", themeId: "comfort", cat: ["guilt"], scripture: "As far as the east is from the west, so far hath he removed our transgressions from us.", reference: "Psalm 103:12",
    encouragement: "East never meets west — the distance is total, permanent. That is how far God has carried the thing you keep replaying. You are more than what you cannot stop remembering; He has already put it out of reach.",
    prayer: "Lord, thank You that my sin is carried away. Help me stop carrying what You have removed." },
  { id: "w23", themeId: "throne", cat: ["guilt", "grief"], scripture: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.", reference: "Lamentations 3:22-23",
    encouragement: "His mercy is no dwindling reserve you are draining toward empty. It is new every morning, restocked before your feet touch the floor — whatever yesterday held, today meets you with a fresh and faithful supply.",
    prayer: "Thank You for mercies new this morning; let me begin again in them." },
  { id: "w24", themeId: "reigns", cat: ["guilt"], scripture: "There is therefore now no condemnation to them which are in Christ Jesus.", reference: "Romans 8:1",
    encouragement: "The verdict is already entered, and it is not the one your guilt keeps reading aloud. No condemnation — not softened, not postponed, simply gone. Step out of the courtroom where the Judge has already cleared your name.",
    prayer: "Lord, I receive Your verdict over my own. Thank You that there is no condemnation." },

  { id: "w25", themeId: "foundation", cat: ["control"], scripture: "The LORD hath prepared his throne in the heavens; and his kingdom ruleth over all.", reference: "Psalm 103:19",
    encouragement: "Whatever has slipped your grip today is still firmly in His. The hand that governs the heavens leans toward your one small, particular trouble — you live in the keeping of a King, not at the mercy of chance.",
    prayer: "You reign over all of it; settle my heart on Your throne." },
  { id: "w26", themeId: "government", cat: ["control", "anxiety"], scripture: "And he arose, and rebuked the wind, and said unto the sea, Peace, be still. And the wind ceased, and there was a great calm.", reference: "Mark 4:39",
    encouragement: "The storm outside may rage on, yet the one inside can fall silent at His word. The voice that hushed the sea speaks the same command over your churning heart; yield to His rule and let the great calm come.",
    prayer: "Speak Your peace over the storm in me, and quiet what I cannot." },
  { id: "w27", themeId: "government", cat: ["control"], scripture: "And he doeth according to his will in the army of heaven, and among the inhabitants of the earth: and none can stay his hand.", reference: "Daniel 4:35",
    encouragement: "No power you fear, no chaos you watch, no worst you can imagine is able to seize His hand and hold it. The reach beyond your control rests in a grip that cannot be forced — make that your anchor today.",
    prayer: "Nothing can stay Your hand; be my anchor when all feels unmoored." },

  { id: "w28", themeId: "triumph", cat: ["gratitude", "suffering"], scripture: "These things I have spoken unto you, that in me ye might have peace. In the world ye shall have tribulation: but be of good cheer; I have overcome the world.", reference: "John 16:33",
    encouragement: "However the day is going, the ending is already secured, and it is good. The trouble is real but passing; the victory is real and final, and you stand on the winning side of a settled story.",
    prayer: "When I lose sight of the end, remind me that You have overcome." },
  { id: "w29", themeId: "centre", cat: ["gratitude"], scripture: "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name. For the LORD is good.", reference: "Psalm 100:4-5",
    encouragement: "Thanksgiving and honesty can share one breath: you can name what is hard and still rehearse who God is. His goodness runs under the worst days like bedrock — say one mercy aloud, and let it open the gate.",
    prayer: "You are good; I thank You for Your steady mercy today." },
  { id: "w30", themeId: "patience", cat: ["gratitude"], scripture: "In every thing give thanks: for this is the will of God in Christ Jesus concerning you.", reference: "1 Thessalonians 5:18",
    encouragement: "Not for everything, but in everything — there is always something to thank Him for, even when much is hard. Thanksgiving lifts your eyes from what is missing to the One who remains. And He always remains.",
    prayer: "Father, in the middle of all of it, I give You thanks. You are enough." },

  { id: "w31", themeId: "occupied", cat: ["anxiety"], scripture: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.", reference: "Isaiah 26:3",
    encouragement: "Peace grows from a mind fixed on God more than from circumstances finally behaving. When your thoughts spin, the move is to turn your gaze back to Him rather than grit harder toward calm.",
    prayer: "I fix my mind on You; keep me in Your perfect peace." },
  { id: "w32", themeId: "calm", cat: ["anxiety"], scripture: "In the multitude of my thoughts within me thy comforts delight my soul.", reference: "Psalm 94:19",
    encouragement: "Worried thoughts pile up faster than you can answer them, and He meets the whole crowd with comfort. You need not silence every fear; you need only carry them to the One whose comfort runs deeper.",
    prayer: "In the crowd of my anxious thoughts, let Your comfort delight my soul." },
  { id: "w33", themeId: "taketh", cat: ["grief"], scripture: "The LORD gave, and the LORD hath taken away; blessed be the name of the LORD.", reference: "Job 1:21",
    encouragement: "What was taken was first a gift from His hand, and that hand has not turned against you. Grief and worship can share one breath; you can weep and bless His name at once.",
    prayer: "Father, You gave and You have taken; help me still to bless Your name." },
  { id: "w34", themeId: "father", cat: ["grief"], scripture: "Blessed are they that mourn: for they shall be comforted.", reference: "Matthew 5:4",
    encouragement: "Mourning is not a detour around God's blessing — it is named inside it. A comfort is promised that fits the exact size of your loss, and it is already on its way from Him.",
    prayer: "You promise comfort to those who mourn; let me feel it." },
  { id: "w35", themeId: "future", cat: ["grief", "death"], scripture: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying.", reference: "Revelation 21:4",
    encouragement: "The day is coming when His own hand will dry every tear you have cried. This grief is real, but it does not get the last word; a sovereign God has written an ending where sorrow itself dies.",
    prayer: "Hold me until the day You wipe away every tear." },
  { id: "w36", themeId: "throne", cat: ["decisions"], scripture: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.", reference: "James 1:5",
    encouragement: "You were not left to puzzle it out alone, and He never scolds the one who asks. Ask plainly for wisdom; a generous God has bound Himself to give it.",
    prayer: "I lack wisdom for this; give it to me liberally, as You promised." },
  { id: "w37", themeId: "reigns", cat: ["decisions"], scripture: "The steps of a good man are ordered by the LORD: and he delighteth in his way.", reference: "Psalm 37:23",
    encouragement: "Your very steps are ordered by Someone who delights in you. Move forward even without certainty, for the One directing your path carries no anxiety about it.",
    prayer: "Order my steps, and steady me to take the next one." },
  { id: "w38", themeId: "surrender", cat: ["decisions"], scripture: "There are many devices in a man's heart; nevertheless the counsel of the LORD, that shall stand.", reference: "Proverbs 19:21",
    encouragement: "Make your plans, and hold them loosely; His counsel stands whatever you decide. Far from threatening your freedom, that frees you — His good purpose never hung on your guessing perfectly.",
    prayer: "My plans are many; let Your good counsel stand over them." },
  { id: "w39", themeId: "silver", cat: ["suffering"], scripture: "While we look not at the things which are seen, but at the things which are not seen: for the things which are seen are temporal; but the things which are not seen are eternal.", reference: "2 Corinthians 4:18",
    encouragement: "Whatever fills your sight now is the part that fades; the unseen is the part that endures. Faith looks past the pain to the God who outlasts it.",
    prayer: "Lift my eyes from what is seen to what is eternal." },
  { id: "w40", themeId: "forgood", cat: ["suffering"], scripture: "We glory in tribulations also: knowing that tribulation worketh patience.", reference: "Romans 5:3",
    encouragement: "This endurance has a point: something is being formed in you that could come no other way. A sovereign God wastes nothing, not even this.",
    prayer: "Work something good in me through what I would never have chosen." },
  { id: "w41", themeId: "patience", cat: ["waiting"], scripture: "The LORD is good unto them that wait for him, to the soul that seeketh him.", reference: "Lamentations 3:25",
    encouragement: "Waiting is rarely God withholding good; more often it is the place His goodness comes to find you. He is good to those who wait, and not in spite of the wait but inside it.",
    prayer: "You are good to those who wait; meet me here." },
  { id: "w42", themeId: "throne", cat: ["waiting"], scripture: "I waited patiently for the LORD; and he inclined unto me, and heard my cry.", reference: "Psalm 40:1",
    encouragement: "Your wait is not silence on His end. He inclines, He bends low, He hears; your cry has not risen into an empty sky.",
    prayer: "I wait for You; incline Your ear and hear my cry." },
  { id: "w43", themeId: "forgood", cat: ["waiting"], scripture: "And therefore will the LORD wait, that he may be gracious unto you.", reference: "Isaiah 30:18",
    encouragement: "Sometimes the delay is grace preparing, not absence withholding. He waits so that what He finally gives arrives whole, a kindness rather than a fragment.",
    prayer: "While I wait, I trust that You are waiting to be gracious to me." },
  { id: "w44", themeId: "calm", cat: ["lonely", "overwhelm"], scripture: "When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee.", reference: "Isaiah 43:2",
    encouragement: "He does not promise you will skip the deep water, but He promises you will not go through it alone. The God who reigns over the flood is in it with you.",
    prayer: "When the waters rise, remind me You are in them with me." },
  { id: "w45", themeId: "father", cat: ["lonely"], scripture: "When my father and my mother forsake me, then the LORD will take me up.", reference: "Psalm 27:10",
    encouragement: "Where the closest human ties give way, His holds. When everyone who should have stayed has gone, He is the One who gathers you up.",
    prayer: "Where I have been left, take me up and keep me." },
  { id: "w46", themeId: "gaze", cat: ["lonely"], scripture: "Nevertheless I am continually with thee: thou hast holden me by my right hand.", reference: "Psalm 73:23",
    encouragement: "However alone you feel, the deeper fact stands: you are continually with Him, held by the hand. Feelings can lie about His nearness; His grip never loosens.",
    prayer: "Thank You for holding my hand even when I feel alone." },
  { id: "w47", themeId: "cordial", cat: ["weary"], scripture: "He maketh me to lie down in green pastures: he leadeth me beside the still waters.", reference: "Psalm 23:2",
    encouragement: "The Shepherd does more than drive you onward; He makes you lie down. When He is the one leading you to rest, rest is obedience, not laziness.",
    prayer: "Lead me to the still waters, and let me rest there." },
  { id: "w48", themeId: "rest", cat: ["weary"], scripture: "My presence shall go with thee, and I will give thee rest.", reference: "Exodus 33:14",
    encouragement: "The rest you crave is less a lighter calendar than His presence going with you. He does not send you on ahead; He comes, and rest comes with Him.",
    prayer: "Go with me, and give me the rest only Your presence brings." },
  { id: "w49", themeId: "cordial", cat: ["weary"], scripture: "My grace is sufficient for thee: for my strength is made perfect in weakness.", reference: "2 Corinthians 12:9",
    encouragement: "Your weakness does not disqualify you; it is the stage where His strength performs best. You need not be strong for His grace to be enough.",
    prayer: "In my weakness, let Your sufficient grace be enough." },
  { id: "w50", themeId: "comfort", cat: ["guilt"], scripture: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.", reference: "1 John 1:9",
    encouragement: "No groveling, no earning your way back — only the truth, told plainly. He forgives faithfully, the way a person keeps a long-standing promise.",
    prayer: "I confess it; thank You for cleansing me as You promised." },
  { id: "w51", themeId: "surrender", cat: ["guilt"], scripture: "Though your sins be as scarlet, they shall be as white as snow; though they be red like crimson, they shall be as wool.", reference: "Isaiah 1:18",
    encouragement: "No stain you carry sits beyond His power to cleanse. He does more than cover scarlet; He turns it white as snow.",
    prayer: "Wash what I cannot scrub clean, and make me white as snow." },
  { id: "w52", themeId: "reigns", cat: ["guilt"], scripture: "He will subdue our iniquities; and thou wilt cast all their sins into the depths of the sea.", reference: "Micah 7:19",
    encouragement: "He does not shelve your sins to raise again later; He drowns them in the sea. What He has cast into the depths, you can stop fishing back out.",
    prayer: "Thank You for casting my sins into the sea; help me leave them there." },
  { id: "w53", themeId: "cordial", cat: ["guilt"], scripture: "And I will restore to you the years that the locust hath eaten.", reference: "Joel 2:25",
    encouragement: "Even the years you count as wasted lie within His power to redeem. A sovereign God can restore what the locust ate.",
    prayer: "Restore what I have squandered; I trust You with my wasted years." },
  { id: "w54", themeId: "godhood", cat: ["control"], scripture: "I am God, and there is none else; I am God, and there is none like me.", reference: "Isaiah 46:9",
    encouragement: "There is exactly one God, and the role is filled — it was never going to be you. The pressure you feel to hold everything together belongs to Someone else, and He carries it well.",
    prayer: "You alone are God; I lay down what was never mine to hold." },
  { id: "w55", themeId: "ruling", cat: ["control"], scripture: "And he is before all things, and by him all things consist.", reference: "Colossians 1:17",
    encouragement: "The world you fear is splitting apart is, this very moment, held together by Him. What you cannot keep from unraveling, He is holding at the seams.",
    prayer: "You hold all things together; hold the parts of my life I cannot." },
  { id: "w56", themeId: "cordial", cat: ["gratitude"], scripture: "Bless the LORD, O my soul, and forget not all his benefits.", reference: "Psalm 103:2",
    encouragement: "Gratitude is mostly a war against forgetting. Say His kindnesses out loud, because a remembering heart is a steadier one.",
    prayer: "I bless You, and I will not forget Your kindnesses to me." },
  { id: "w57", themeId: "gaze", cat: ["gratitude"], scripture: "This is the day which the LORD hath made; we will rejoice and be glad in it.", reference: "Psalm 118:24",
    encouragement: "This day, with everything wrong in it, was still made by Him — reason enough to find some gladness here. He did not assemble it by accident.",
    prayer: "You made this day; help me rejoice and be glad in it." },
  { id: "w58", themeId: "centre", cat: ["gratitude"], scripture: "O give thanks unto the LORD; for he is good; for his mercy endureth for ever.", reference: "1 Chronicles 16:34",
    encouragement: "His goodness is not on loan, due to expire; His mercy runs on without end. Give thanks from solid ground, because the ground does not shift.",
    prayer: "Father, You are good and Your mercy never ends; receive my thanks." },
  { id: "w59", themeId: "surrender", cat: ["gratitude"], scripture: "Giving thanks always for all things unto God and the Father in the name of our Lord Jesus Christ.", reference: "Ephesians 5:20",
    encouragement: "Thanksgiving does not deny the hard things; it trusts that even those rest in a good God's hands. To thank Him in all things is to confess He is over all things.",
    prayer: "Father, I give You thanks, trusting Your hand even in what I do not understand." },
  { id: "w60", themeId: "future", cat: ["future"], scripture: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", reference: "Jeremiah 29:11",
    encouragement: "He is not merely in charge of your future; He is kindly disposed toward it. His thoughts toward you run to peace.",
    prayer: "Father, thank You that Your thoughts toward me are peace; calm my fear of what is next." },
  { id: "w61", themeId: "purposed", cat: ["future"], scripture: "My times are in thy hand.", reference: "Psalm 31:15",
    encouragement: "Your future is not drifting loose; it already rests in His hand. Whatever the calendar holds, He holds it first.",
    prayer: "My times are in Your hand; I leave my tomorrows there." },
  { id: "w62", themeId: "faith", cat: ["future"], scripture: "Jesus Christ the same yesterday, and to day, and for ever.", reference: "Hebrews 13:8",
    encouragement: "You cannot know what is coming, but you know who will meet you in it. The Christ who held you yesterday will be unchanged when you arrive.",
    prayer: "You never change; carry me into a future I cannot see." },
  { id: "w63", themeId: "steadfast", cat: ["future"], scripture: "Which hope we have as an anchor of the soul, both sure and stedfast.", reference: "Hebrews 6:19",
    encouragement: "Hope here is no wishful thinking; it is an anchor driven into the unshakable character of God. However the unknown storms, you are moored to Him.",
    prayer: "Be the sure anchor of my soul as I face the unknown." },
  { id: "w64", themeId: "security", cat: ["future"], scripture: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.", reference: "Psalm 23:6",
    encouragement: "Goodness and mercy are not fading behind you; they follow you into every day still to come. The kindness of God trails your whole future.",
    prayer: "Let Your goodness and mercy follow me into all my tomorrows." },
  { id: "w65", themeId: "godhood", cat: ["future"], scripture: "Declaring the end from the beginning, and from ancient times the things that are not yet done.", reference: "Isaiah 46:10",
    encouragement: "He already stands at the end of your story, and from there it reads finished and good. Nothing ahead will catch off guard the God who announced it from the start.",
    prayer: "You know the end from the beginning; I trust You with mine." },
  { id: "w66", themeId: "surrender", cat: ["future"], scripture: "Commit thy way unto the LORD; trust also in him; and he shall bring it to pass.", reference: "Psalm 37:5",
    encouragement: "Tomorrow is not yours to force into shape; hand your way to God and trust Him to bring it to pass. The future is His to deliver, not yours to manufacture.",
    prayer: "Lord, I commit my way to You; bring it to pass in Your time." },
  { id: "w67", themeId: "foundation", cat: ["change"], scripture: "But thou art the same, and thy years shall have no end.", reference: "Psalm 102:27",
    encouragement: "Everything around you ages and ends; He alone stays the same, without end. In a shifting world, He is the one fixed thing worth holding.",
    prayer: "You are the same and never end; be my constant in change." },
  { id: "w68", themeId: "ruling", cat: ["change"], scripture: "To every thing there is a season, and a time to every purpose under the heaven.", reference: "Ecclesiastes 3:1",
    encouragement: "This new season never caught God off guard — He is the one who appoints the times. What lands on you as upheaval was ordered by Him.",
    prayer: "You set the seasons; help me trust Your timing in this one." },
  { id: "w69", themeId: "future", cat: ["change"], scripture: "Behold, I will do a new thing; now it shall spring forth; shall ye not know it?", reference: "Isaiah 43:19",
    encouragement: "In His hands, endings are often beginnings you cannot yet make out. He is not only taking something away; He is bringing something new to bud.",
    prayer: "Where an old thing ends, open my eyes to the new thing You are doing." },
  { id: "w70", themeId: "reigns", cat: ["change"], scripture: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.", reference: "Joshua 1:9",
    encouragement: "Into the unfamiliar, you do not walk alone. The same God travels with you wherever the change carries you.",
    prayer: "Go with me into this new and unfamiliar place." },
  { id: "w71", themeId: "future", cat: ["change", "decisions"], scripture: "And thine ears shall hear a word behind thee, saying, This is the way, walk ye in it.", reference: "Isaiah 30:21",
    encouragement: "When the path bends and you are unsure, He guides from just behind with a quiet word. You will not be left to guess your own way.",
    prayer: "Lord, speak Your 'this is the way' as I walk through change." },
  { id: "w72", themeId: "foundation", cat: ["change", "overwhelm"], scripture: "God is our refuge and strength, a very present help in trouble.", reference: "Psalm 46:1",
    encouragement: "When the ground moves, He is the refuge that does not. Not a help held in reserve, He is a very present one, right here in the upheaval.",
    prayer: "Be my refuge and strength while everything shifts." },
  { id: "w73", themeId: "occupied", cat: ["change"], scripture: "I have set the LORD always before me: because he is at my right hand, I shall not be moved.", reference: "Psalm 16:8",
    encouragement: "Keep Him before you while all else moves, and you will not be carried off with it. A steady gaze on God steadies the one who gazes.",
    prayer: "I set You before me; keep me unshaken through the changes." },
  { id: "w74", themeId: "taketh", cat: ["illness"], scripture: "The LORD will strengthen him upon the bed of languishing.", reference: "Psalm 41:3",
    encouragement: "He does not desert the sickroom; He is present at the bedside. The God who reigns over all draws near in the long, slow days of being unwell.",
    prayer: "Strengthen me on the hard days, and be near in the sickroom." },
  { id: "w75", themeId: "hand", cat: ["illness"], scripture: "I will praise thee; for I am fearfully and wonderfully made.", reference: "Psalm 139:14",
    encouragement: "The body failing you was still knit together with care, and its Maker has not lost interest. You are no malfunction to Him; you are His handiwork.",
    prayer: "You made me with care; hold this body that is struggling." },
  { id: "w76", themeId: "comfort", cat: ["illness"], scripture: "My flesh and my heart faileth: but God is the strength of my heart, and my portion for ever.", reference: "Psalm 73:26",
    encouragement: "When the body gives out, He does not give out with it. Your flesh may fail, but the strength of your heart is Someone who never will.",
    prayer: "When my body fails, be the strength of my heart, O God." },
  { id: "w77", themeId: "future", cat: ["illness"], scripture: "Who forgiveth all thine iniquities; who healeth all thy diseases.", reference: "Psalm 103:3",
    encouragement: "Every healing you have ever known came from His hand, and the last, complete one still lies ahead. Whatever your body is doing now, He presides over it as healer.",
    prayer: "I trust my body to You, the healer of all my diseases." },
  { id: "w78", themeId: "surrender", cat: ["illness"], scripture: "And Jesus put forth his hand, and touched him, saying, I will; be thou clean.", reference: "Matthew 8:3",
    encouragement: "The One with power over disease is also willing, never cold to your suffering. Whatever His answer proves to be, it comes from a heart set toward you.",
    prayer: "I bring my body to You; do what is good, and hold me through it." },
  { id: "w79", themeId: "steadfast", cat: ["illness"], scripture: "I had fainted, unless I had believed to see the goodness of the LORD in the land of the living.", reference: "Psalm 27:13",
    encouragement: "Hold on: His goodness shows up not only in the life to come but here, in the land of the living. There is good still to be seen, even from a sickbed.",
    prayer: "Help me hold on to see Your goodness, even now." },
  { id: "w80", themeId: "reigns", cat: ["illness"], scripture: "Heal me, O LORD, and I shall be healed; save me, and I shall be saved: for thou art my praise.", reference: "Jeremiah 17:14",
    encouragement: "Bring your body honestly to Him and ask. He is sovereign over the outcome and good within it, whatever it proves to be.",
    prayer: "Heal me; and whatever You answer, keep me trusting You." },
  { id: "w81", themeId: "throne", cat: ["provision"], scripture: "Behold the fowls of the air: for they sow not, neither do they reap; yet your heavenly Father feedeth them. Are ye not much better than they?", reference: "Matthew 6:26",
    encouragement: "The God who keeps the sparrows fed has not overlooked you. You are worth more to Him than the birds He already provides for.",
    prayer: "You feed the birds; help me trust You to provide for me." },
  { id: "w82", themeId: "future", cat: ["provision"], scripture: "But my God shall supply all your need according to his riches in glory by Christ Jesus.", reference: "Philippians 4:19",
    encouragement: "His supply is measured by His riches, not by your bank balance, and those riches never run low. He has promised to meet what you truly need.",
    prayer: "Supply my needs out of Your riches; I trust You for what is lacking." },
  { id: "w83", themeId: "surrender", cat: ["provision"], scripture: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.", reference: "Matthew 6:33",
    encouragement: "Provision was never meant to be your first burden — that desk belongs to Him. Seek Him first, and trust the rest to be added in its place.",
    prayer: "I seek You first; I trust You to add what I need." },
  { id: "w84", themeId: "reigns", cat: ["provision"], scripture: "And Abraham called the name of that place Jehovahjireh: as it is said to this day, In the mount of the LORD it shall be seen.", reference: "Genesis 22:14",
    encouragement: "He provides, and often at the last hour, in the last place you would have looked. The supply may not come early, but it is seen on His mountain.",
    prayer: "You are my provider; I trust You to be seen in my need." },
  { id: "w85", themeId: "cordial", cat: ["provision"], scripture: "I have been young, and now am old; yet have I not seen the righteous forsaken, nor his seed begging bread.", reference: "Psalm 37:25",
    encouragement: "Over a long life the psalmist watched it hold true: God does not forsake His own. You will not turn out to be the exception to His faithfulness.",
    prayer: "You have never forsaken Your people; I trust You will not forsake me." },
  { id: "w86", themeId: "anchor", cat: ["provision"], scripture: "The LORD is my shepherd; I shall not want.", reference: "Psalm 23:1",
    encouragement: "With the Shepherd over you, lack does not get the final say. He leads, He provides, and what you truly need will not go missing.",
    prayer: "You are my Shepherd; help me rest, knowing I shall not want." },
  { id: "w87", themeId: "faith", cat: ["provision"], scripture: "I have learned, in whatsoever state I am, therewith to be content.", reference: "Philippians 4:11",
    encouragement: "Contentment is learned, not native, and it is learned by trusting the God who holds your circumstances. The peace He gives does not depend on the size of your supply.",
    prayer: "Lord, teach me contentment that rests in You, not in what I have." },
  { id: "w88", themeId: "surrender", cat: ["relationships"], scripture: "If it be possible, as much as lieth in you, live peaceably with all men.", reference: "Romans 12:18",
    encouragement: "Your job is your own side of the rope, not the other person's. Do what is yours to do, and entrust the rest, and them, to God.",
    prayer: "Help me do my part in peace, and trust You with what I cannot fix." },
  { id: "w89", themeId: "ruling", cat: ["relationships"], scripture: "The king's heart is in the hand of the LORD, as the rivers of water: he turneth it whithersoever he will.", reference: "Proverbs 21:1",
    encouragement: "Even the heart you cannot reach lies well within God's reach. He turns hearts the way He turns rivers; pray, and leave the turning to Him.",
    prayer: "You hold their heart as I cannot; turn it as You will." },
  { id: "w90", themeId: "comfort", cat: ["relationships"], scripture: "He healeth the broken in heart, and bindeth up their wounds.", reference: "Psalm 147:3",
    encouragement: "When a bond wounds you, He is the one who binds up what tore. He does more than witness the break; He heals it.",
    prayer: "Bind up the wound this relationship has left, and heal my heart." },
  { id: "w91", themeId: "patience", cat: ["relationships"], scripture: "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye.", reference: "Colossians 3:13",
    encouragement: "Forgiveness is less about the other deserving it than about you going free of the weight. God forgave you first, and He will supply the grace to release this too.",
    prayer: "Give me the grace to forgive as I have been forgiven." },
  { id: "w92", themeId: "reigns", cat: ["relationships", "lonely"], scripture: "God setteth the solitary in families.", reference: "Psalm 68:6",
    encouragement: "God sees the lonely places in your relationships and works even there. He has a way of setting the isolated into belonging.",
    prayer: "You set the solitary in families; meet me in my isolation." },
  { id: "w93", themeId: "faith", cat: ["relationships"], scripture: "Beareth all things, believeth all things, hopeth all things, endureth all things.", reference: "1 Corinthians 13:7",
    encouragement: "Enduring love is not naive; it is anchored in a God who endures alongside you. Where loving someone costs you, He resupplies what you run out of.",
    prayer: "Where my love fails, supply Yours; help me bear and hope." },
  { id: "w94", themeId: "surrender", cat: ["relationships", "anger"], scripture: "Love your enemies, bless them that curse you, do good to them that hate you.", reference: "Matthew 5:44",
    encouragement: "You are not asked to feel warmly toward those who hurt you, only to hand them to God and refuse the bitterness. Let Him carry the justice while you carry the peace.",
    prayer: "Help me bless where I have been hurt, and leave justice with You." },
  { id: "w95", themeId: "throne", cat: ["family"], scripture: "Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house.", reference: "Acts 16:31",
    encouragement: "Your longing for your family to know God is smaller than His own. He is already at work in the ones you pray for, even where no sign shows.",
    prayer: "Father, I bring my household to You; work in the ones I love." },
  { id: "w96", themeId: "father", cat: ["family"], scripture: "And all thy children shall be taught of the LORD; and great shall be the peace of thy children.", reference: "Isaiah 54:13",
    encouragement: "Your children's deepest teacher is finally God, not you. Yours is not the only hand on their lives, and His is steadier than your own.",
    prayer: "Teach my children Yourself, and give them Your peace." },
  { id: "w97", themeId: "surrender", cat: ["family"], scripture: "Therefore also I have lent him to the LORD; as long as he liveth he shall be lent to the LORD.", reference: "1 Samuel 1:28",
    encouragement: "The ones you love were never wholly yours to keep; they are His, lent into your care. Held open-handed before God is the safest place they can be.",
    prayer: "I give my family back to You; keep them better than I can." },
  { id: "w98", themeId: "taketh", cat: ["family"], scripture: "Lo, children are an heritage of the LORD: and the fruit of the womb is his reward.", reference: "Psalm 127:3",
    encouragement: "Your children come from His hand as a gift, not a weight you shoulder alone. The God who gave them has not left you to raise them on your own strength.",
    prayer: "Thank You for these You have given me; help me raise them in Your strength." },
  { id: "w99", themeId: "father", cat: ["family"], scripture: "But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him.", reference: "Luke 15:20",
    encouragement: "If you are waiting on a wandering child, remember the father in the story runs toward the one coming home. He spots them far down the road; keep watch with Him.",
    prayer: "Watch the road with me, Father, and bring my wanderer home." },
  { id: "w100", themeId: "patience", cat: ["family"], scripture: "And let us not be weary in well doing: for in due season we shall reap, if we faint not.", reference: "Galatians 6:9",
    encouragement: "The quiet, faithful work you pour into your family is not lost; it is seed in the ground. A sovereign God keeps the harvest, even when no growth shows yet.",
    prayer: "Keep me faithful at home, and bring a harvest in due season." },
  { id: "w101", themeId: "reigns", cat: ["family"], scripture: "As for me and my house, we will serve the LORD.", reference: "Joshua 24:15",
    encouragement: "You cannot manufacture anyone's heart, but you can set the direction of your home and leave the rest to God. Drive the stake, and let Him do the growing.",
    prayer: "Let my home be turned toward You; do what only You can do in them." },
  { id: "w102", themeId: "surrender", cat: ["anger"], scripture: "Dearly beloved, avenge not yourselves: for it is written, Vengeance is mine; I will repay, saith the Lord.", reference: "Romans 12:19",
    encouragement: "Set the burden of justice down; it belongs to God, not to you. He saw what was done more clearly than you did, and He will not let it pass unanswered.",
    prayer: "I hand You the wrong done to me; You will repay, not I." },
  { id: "w103", themeId: "purposed", cat: ["anger"], scripture: "Rest in the LORD, and wait patiently for him: fret not thyself because of him who prospereth in his way.", reference: "Psalm 37:7",
    encouragement: "Watching the wrong prosper is its own torment, and God invites you to stop feeding it. Rest, for the One on the throne has not missed a single thing.",
    prayer: "I stop fretting over the injustice; I rest and wait for You." },
  { id: "w104", themeId: "ruling", cat: ["anger"], scripture: "But the LORD shall endure for ever: he hath prepared his throne for judgment.", reference: "Psalm 9:7",
    encouragement: "There is a court that never closes and a Judge who never retires. Every injustice that slipped past earthly accounting is held in His.",
    prayer: "You judge rightly; I trust the wrong I have suffered to Your court." },
  { id: "w105", themeId: "surrender", cat: ["anger"], scripture: "Be ye angry, and sin not: let not the sun go down upon your wrath.", reference: "Ephesians 4:26",
    encouragement: "Anger at real wrong is not itself sin, but it sours when you nurse it overnight. Hand it to God before you sleep, and let Him keep what would have kept you awake.",
    prayer: "I give You my anger before the day ends; guard my heart from bitterness." },
  { id: "w106", themeId: "patience", cat: ["anger"], scripture: "Let every man be swift to hear, slow to speak, slow to wrath.", reference: "James 1:19",
    encouragement: "A slower anger leaves room for God to move before you do. Waiting here is not weakness; it is trusting Him to handle what your wrath cannot.",
    prayer: "Make me slow to anger, and quick to trust You with it." },
  { id: "w107", themeId: "comfort", cat: ["anger"], scripture: "Thou hast seen it; for thou beholdest mischief and spite, to requite it with thy hand.", reference: "Psalm 10:14",
    encouragement: "What was done to you did not escape God's notice. He saw the whole of it, and far from shrugging at injustice, He holds it in His hand.",
    prayer: "You saw what happened; I trust it to Your just and seeing hand." },
  { id: "w108", themeId: "faith", cat: ["anger"], scripture: "Shall not the Judge of all the earth do right?", reference: "Genesis 18:25",
    encouragement: "When injustice makes no sense, one thing holds: the Judge of all the earth will do right. You can release the case without releasing the truth that He is just.",
    prayer: "The Judge of all the earth will do right; help me rest in that." },
  { id: "w109", themeId: "reigns", cat: ["temptation"], scripture: "God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape.", reference: "1 Corinthians 10:13",
    encouragement: "You are never as cornered as the moment makes you feel. A faithful God has capped the pressure and cut a door in the wall.",
    prayer: "Show me the way of escape You promised, and give me strength to take it." },
  { id: "w110", themeId: "surrender", cat: ["temptation"], scripture: "Watch and pray, that ye enter not into temptation: the spirit indeed is willing, but the flesh is weak.", reference: "Matthew 26:41",
    encouragement: "This is no battle for willpower alone; it is fought on your knees. Bring the struggle to God before it brings you down.",
    prayer: "I am weak here; watch with me and keep me from falling." },
  { id: "w111", themeId: "cordial", cat: ["temptation"], scripture: "For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin.", reference: "Hebrews 4:15",
    encouragement: "The One you cry to has felt the exact pull you feel, and did not give way. He does not look down on your struggle; He knows it from the inside.",
    prayer: "You were tempted as I am; meet me with mercy in my struggle." },
  { id: "w112", themeId: "faith", cat: ["temptation"], scripture: "Submit yourselves therefore to God. Resist the devil, and he will flee from you.", reference: "James 4:7",
    encouragement: "Stand on God's side of the pull and the thing that felt overpowering takes flight. You do not face it alone or on level ground.",
    prayer: "I submit to You; give me grace to resist, and watch the pull flee." },
  { id: "w113", themeId: "anchor", cat: ["temptation"], scripture: "Thy word have I hid in mine heart, that I might not sin against thee.", reference: "Psalm 119:11",
    encouragement: "His word stored up in you is ballast against the moment of pull. When feeling makes its case for giving in, truth already planted holds you fast.",
    prayer: "Plant Your word deep in me, that it may hold me when I am tempted." },
  { id: "w114", themeId: "future", cat: ["temptation"], scripture: "Now unto him that is able to keep you from falling, and to present you faultless before the presence of his glory.", reference: "Jude 1:24",
    encouragement: "Your standing rests, in the end, on His power to keep you, not on the strength of your grip. He is able to hold you up where you cannot hold yourself.",
    prayer: "You are able to keep me from falling; keep me today." },
  { id: "w115", themeId: "occupied", cat: ["doubt"], scripture: "Lord, I believe; help thou mine unbelief.", reference: "Mark 9:24",
    encouragement: "You do not need flawless faith to come to Him; you can bring the doubt itself and ask for help. Honest, struggling faith is still faith, and He meets it.",
    prayer: "Lord, I believe; help my unbelief." },
  { id: "w116", themeId: "silver", cat: ["doubt"], scripture: "How long wilt thou forget me, O LORD? for ever? how long wilt thou hide thy face from me?", reference: "Psalm 13:1",
    encouragement: "Even the cry that feels like shouting into silence has a home in the Psalms; God is not offended by your honest questions. That you are still calling out to Him is itself a thread of faith.",
    prayer: "When You feel hidden, I still turn to You; do not let me go." },
  { id: "w117", themeId: "faith", cat: ["doubt"], scripture: "If we believe not, yet he abideth faithful: he cannot deny himself.", reference: "2 Timothy 2:13",
    encouragement: "His faithfulness does not rise and fall with your feelings. When your faith gutters like a candle, He remains; He cannot be otherwise.",
    prayer: "When my faith is weak, thank You that You remain faithful." },
  { id: "w118", themeId: "centre", cat: ["doubt"], scripture: "For my thoughts are not your thoughts, neither are your ways my ways, saith the LORD.", reference: "Isaiah 55:8",
    encouragement: "Sometimes God feels far because He is larger than your understanding, not because He has left. The gap you feel measures His greatness, not His neglect.",
    prayer: "When I cannot trace Your ways, help me trust that You are near." },
  { id: "w119", themeId: "shepherd", cat: ["doubt"], scripture: "My sheep hear my voice, and I know them, and they follow me.", reference: "John 10:27",
    encouragement: "Even with no sense of Him, He knows you, and being known by Him does not wait on your feeling it. The Shepherd has not lost you in the fog.",
    prayer: "When I cannot sense You, thank You that You still know me." },
  { id: "w120", themeId: "gaze", cat: ["doubt"], scripture: "Why art thou cast down, O my soul? hope thou in God: for I shall yet praise him.", reference: "Psalm 42:5",
    encouragement: "You are allowed to talk back to your own downcast heart and aim it at God. Hope is a choice you make before the feeling comes back, and it will.",
    prayer: "When my soul is downcast, I will hope in You still." },
  { id: "w121", themeId: "steadfast", cat: ["doubt"], scripture: "Behold, I have graven thee upon the palms of my hands; thy walls are continually before me.", reference: "Isaiah 49:16",
    encouragement: "You have not dropped out of God's sight or mind; He has engraved you on His own hands. However far He feels, you stand permanently before Him.",
    prayer: "When You feel distant, remind me I am graven on Your hands." },
  { id: "w122", themeId: "future", cat: ["death"], scripture: "I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live.", reference: "John 11:25",
    encouragement: "For those who are His, death is a comma, not the end of the sentence. The One who is the resurrection speaks the final word, and that word is life.",
    prayer: "Jesus, You are the resurrection and the life; hold me and mine in that hope." },
  { id: "w123", themeId: "comfort", cat: ["death", "grief"], scripture: "Precious in the sight of the LORD is the death of his saints.", reference: "Psalm 116:15",
    encouragement: "The passing of His people is never careless or unnoticed; it is precious to Him. Your loss is held by a God to whom that life was dear.",
    prayer: "This death is precious to You; comfort me with that nearness." },
  { id: "w124", themeId: "taketh", cat: ["death", "grief"], scripture: "That ye sorrow not, even as others which have no hope.", reference: "1 Thessalonians 4:13",
    encouragement: "You are free to grieve, only not as those with nothing past the grave. Your sorrow walks beside a hope that death cannot reach.",
    prayer: "Let me grieve with hope, sure of the life beyond this one." },
  { id: "w125", themeId: "triumph", cat: ["death"], scripture: "O death, where is thy sting? O grave, where is thy victory?", reference: "1 Corinthians 15:55",
    encouragement: "Death still wounds, but it has been disarmed; its sting was drawn out at the cross. The grave is real, yet it no longer wins.",
    prayer: "Thank You that death has lost its sting; steady me with Your victory." },
  { id: "w126", themeId: "rest", cat: ["death"], scripture: "Blessed are the dead which die in the Lord... that they may rest from their labours.", reference: "Revelation 14:13",
    encouragement: "For those who are His, death opens onto rest, not nothingness. The labor and the pain are finished; they are at peace with Him.",
    prayer: "Give me peace in the rest You grant Your people." },
  { id: "w127", themeId: "future", cat: ["death"], scripture: "In my Father's house are many mansions... I go to prepare a place for you.", reference: "John 14:2",
    encouragement: "The place beyond is neither vague nor empty; He has prepared it Himself, for you. You are not heading into nothing but into a home made ready.",
    prayer: "Thank You for preparing a place; calm my fear of what is beyond." },
  { id: "w128", themeId: "steadfast", cat: ["death"], scripture: "Whether we live therefore, or die, we are the Lord's.", reference: "Romans 14:8",
    encouragement: "Living or dying, you never fall out of His keeping; you belong to Him on both sides of it. There is no version of this in which you are not His.",
    prayer: "Whether I live or die, I am Yours; hold me in both." },
  { id: "w129", themeId: "calm", cat: ["overwhelm"], scripture: "From the end of the earth will I cry unto thee, when my heart is overwhelmed: lead me to the rock that is higher than I.", reference: "Psalm 61:2",
    encouragement: "In over your head, there is a rock higher than you to be carried to. You do not have to climb out — you have to cry out.",
    prayer: "My heart is overwhelmed; lead me to the rock that is higher than I." },
  { id: "w130", themeId: "foundation", cat: ["overwhelm"], scripture: "Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved.", reference: "Psalm 55:22",
    encouragement: "You were never built to carry all of this, and you do not have to. Roll the weight onto Him, and let Him do the holding.",
    prayer: "Lord, I cast this burden on You; sustain me, for I cannot." },
  { id: "w131", themeId: "cordial", cat: ["overwhelm", "weary"], scripture: "For my yoke is easy, and my burden is light.", reference: "Matthew 11:30",
    encouragement: "Much of what is crushing you was never His yoke in the first place. Trade the unbearable load you picked up for the one He actually hands you.",
    prayer: "Take the weight I was never meant to carry, and give me Your lighter yoke." },
  { id: "w132", themeId: "surrender", cat: ["overwhelm"], scripture: "The LORD shall fight for you, and ye shall hold your peace.", reference: "Exodus 14:14",
    encouragement: "Some battles are not yours to fight; your part is to stand still and let Him. When it is all too much, the work may simply be to stop and let God act.",
    prayer: "Fight for me where I am outmatched; help me be still." },
  { id: "w133", themeId: "government", cat: ["overwhelm"], scripture: "I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD.", reference: "Psalm 121:1-2",
    encouragement: "When no way through is visible, lift your eyes off the pile and onto the One who helps. Your help comes from Him, not from managing it all.",
    prayer: "Lord, I lift my eyes to You; my help comes from You alone." },
  { id: "w134", themeId: "faith", cat: ["overwhelm"], scripture: "He shall gather the lambs with his arm, and carry them in his bosom.", reference: "Isaiah 40:11",
    encouragement: "On the day you cannot take one more step, He carries you. You are no burden to Him; you are a lamb He gathers to His chest.",
    prayer: "I cannot go on alone; gather me up and carry me." },
  { id: "w135", themeId: "hand", cat: ["overwhelm"], scripture: "When I said, My foot slippeth; thy mercy, O LORD, held me up.", reference: "Psalm 94:18",
    encouragement: "At the very moment you feel yourself going under, His mercy is the thing holding you up. Even now, you have not slipped past His grip.",
    prayer: "When my foot slips, let Your mercy hold me up." },
  { id: "w136", themeId: "godhood", cat: ["comparison"], scripture: "For do I now persuade men, or God? for if I yet pleased men, I should not be the servant of Christ.", reference: "Galatians 1:10",
    encouragement: "You will never measure up to everyone, and you were never built to; one audience's verdict is the one that counts. Live before God, and the scoreboard of others loosens its grip.",
    prayer: "Free me from the verdict of others; let me live before You." },
  { id: "w137", themeId: "hand", cat: ["comparison"], scripture: "Thine eyes did see my substance, yet being unperfect; and in thy book all my members were written.", reference: "Psalm 139:16",
    encouragement: "You were not mass-produced; you were specifically made and known before you drew a breath. Comparison forgets that God never meant you to be someone else.",
    prayer: "Thank You that You made me on purpose; quiet my comparing heart." },
  { id: "w138", themeId: "surrender", cat: ["comparison"], scripture: "Jesus saith unto him, If I will that he tarry till I come, what is that to thee? follow thou me.", reference: "John 21:22",
    encouragement: "Caught measuring your life against another's, you hear Him gently turn your face back: never mind them, follow Me. Your path runs between you and God, not you and the crowd.",
    prayer: "Take my eyes off everyone else, and help me simply follow You." },
  { id: "w139", themeId: "cordial", cat: ["comparison"], scripture: "Comparing themselves among themselves, are not wise.", reference: "2 Corinthians 10:12",
    encouragement: "Comparison is a game with no winners and no finish line. Step out of it; a sovereign God has already weighed your life by His love, not by the one standing beside you.",
    prayer: "I step out of the comparing; measure me by Your love instead." },
  { id: "w140", themeId: "reigns", cat: ["comparison"], scripture: "For the LORD seeth not as man seeth; for man looketh on the outward appearance, but the LORD looketh on the heart.", reference: "1 Samuel 16:7",
    encouragement: "The things you feel behind in are rarely the things God is weighing. He looks straight past the surface you keep comparing, down to the heart.",
    prayer: "You see the heart; help me care more for Your view than the world's." },
  { id: "w141", themeId: "faith", cat: ["comparison"], scripture: "No good thing will he withhold from them that walk uprightly.", reference: "Psalm 84:11",
    encouragement: "What you feel deprived of is not being hidden from you by a forgetful God; He withholds no good thing from His own. If it is not in your hands, perhaps you do not need it yet.",
    prayer: "I trust that You withhold no good thing; quiet my sense of lack." },
  { id: "w142", themeId: "throne", cat: ["comparison"], scripture: "Before I formed thee in the belly I knew thee; and before thou camest forth out of the womb I sanctified thee.", reference: "Jeremiah 1:5",
    encouragement: "Your worth was settled before you ever did a thing worth comparing. God knew you before you could measure up to anyone or fall short of them.",
    prayer: "You knew me before I was born; let that settle my restless heart." },
  { id: "w143", themeId: "security", cat: ["anxiety"], scripture: "Humble yourselves therefore under the mighty hand of God, that he may exalt you in due time: casting all your care upon him; for he careth for you.", reference: "1 Peter 5:6-7",
    encouragement: "Releasing the worry is not losing control; it is finally setting it where it belongs, under His mighty hand. He actually invites the weight you keep straining to manage.",
    prayer: "I humble myself under Your hand and cast my cares on You." },
  { id: "w144", themeId: "forgood", cat: ["suffering"], scripture: "Many are the afflictions of the righteous: but the LORD delivereth him out of them all.", reference: "Psalm 34:19",
    encouragement: "Affliction is no proof that God has forgotten you; even the righteous know it well. Yet the same verse carries a promise of deliverance — in the end, out of them all.",
    prayer: "In the middle of these afflictions, I trust Your deliverance." },
  { id: "w145", themeId: "occupied", cat: ["decisions"], scripture: "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful.", reference: "Colossians 3:15",
    encouragement: "When two paths both look reasonable, let His peace act as the umpire in your chest. A sovereign God can steer you by what settles and what unsettles your spirit.",
    prayer: "Let Your peace rule as I decide; make the way plain." },
  { id: "w146", themeId: "faith", cat: ["weary"], scripture: "For I the LORD thy God will hold thy right hand, saying unto thee, Fear not; I will help thee.", reference: "Isaiah 41:13",
    encouragement: "On the days you cannot summon one more ounce, He takes you by the hand. You are not propping yourself up; He is the one holding you.",
    prayer: "Hold my hand today; I have nothing left without You." },
  { id: "w147", themeId: "faith", cat: ["guilt"], scripture: "I am persuaded, that neither death, nor life... shall be able to separate us from the love of God.", reference: "Romans 8:38-39",
    encouragement: "Nothing you have done carries the power to cut you off from His love; your worst day is not on the list of things that can. A love stronger than your failure has hold of you.",
    prayer: "Thank You that nothing can separate me from Your love." },
  { id: "w148", themeId: "purposed", cat: ["control"], scripture: "Surely I have behaved and quieted myself, as a child that is weaned of his mother: my soul is even as a weaned child.", reference: "Psalm 131:2",
    encouragement: "There is a settled quiet that comes not from having the answers but from trusting the One who does. Like a child resting against its mother, you can stop striving and simply lean.",
    prayer: "Quiet my striving soul; let me rest like a child against You." },
  { id: "w149", themeId: "reigns", cat: ["gratitude"], scripture: "O give thanks unto the LORD, for he is good: for his mercy endureth for ever.", reference: "Psalm 107:1",
    encouragement: "Thankfulness is what a heart does naturally when it remembers who sits on the throne. He is good, His mercy never expires, and that alone is worth your praise.",
    prayer: "I give thanks, for You are good and Your mercy never ends." },
  { id: "w150", themeId: "godhood", cat: ["future", "change"], scripture: "Lord, thou hast been our dwelling place in all generations.", reference: "Psalm 90:1",
    encouragement: "Before there was anything to fear, He was already home; and He will be home long after today's worries have passed. The God who sheltered every generation will shelter yours.",
    prayer: "You have been our dwelling place through all time; be my home now." },

  { id: "w151", themeId: "calm", cat: ["anxiety"], scripture: "He shall not be afraid of evil tidings: his heart is fixed, trusting in the LORD.", reference: "Psalm 112:7",
    encouragement: "Bad news will come, but it need not topple you; a heart fixed on God can take the blow and stay standing. Trust steadies what fear would otherwise shake.",
    prayer: "Fix my heart on You, so bad news cannot topple me." },
  { id: "w152", themeId: "occupied", cat: ["anxiety"], scripture: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.", reference: "2 Timothy 1:7",
    encouragement: "The dread that grips you did not come from God, and it has no authority to define you. He has handed you something steadier instead: power, love, and a sound mind.",
    prayer: "Replace this spirit of fear with Your power, love, and sound mind." },
  { id: "w153", themeId: "throne", cat: ["anxiety"], scripture: "I sought the LORD, and he heard me, and delivered me from all my fears.", reference: "Psalm 34:4",
    encouragement: "Bring your fears to God and you are not speaking into an empty room; He hears, and He answers. The seeking itself is already your first step out of the fear.",
    prayer: "I seek You; hear me, and deliver me from my fears." },
  { id: "w154", themeId: "rest", cat: ["anxiety"], scripture: "I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety.", reference: "Psalm 4:8",
    encouragement: "You can lie down tonight and truly sleep, because your safety rests on His vigilance, not yours. The watch belongs to Him; you are free to close your eyes.",
    prayer: "I lay down my worry and sleep, for You alone keep me safe." },
  { id: "w155", themeId: "forgood", cat: ["anxiety"], scripture: "Which of you by taking thought can add one cubit unto his stature?", reference: "Matthew 6:27",
    encouragement: "Worry has never once moved an outcome; it only borrows tomorrow's trouble and charges interest today. What anxiety can never accomplish, a sovereign God already holds.",
    prayer: "I stop carrying what worry cannot fix, and trust it to You." },
  { id: "w156", themeId: "comfort", cat: ["grief"], scripture: "Blessed be God, even the Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort.", reference: "2 Corinthians 1:3",
    encouragement: "God's very name announces who He is: the Father of mercies, the God of all comfort. Comfort is His vocation, not His hobby, and He meets you inside the trouble, not only after.",
    prayer: "Father of mercies, God of all comfort, meet me in this sorrow." },
  { id: "w157", themeId: "cordial", cat: ["grief"], scripture: "They that sow in tears shall reap in joy.", reference: "Psalm 126:5",
    encouragement: "The tears you are sowing now are not the end of the ledger; God has promised a harvest of joy from them. What you weep over, He can turn into reaping.",
    prayer: "You promise that tears sown will be reaped in joy; hold me to that harvest." },
  { id: "w158", themeId: "father", cat: ["grief"], scripture: "Thou tellest my wanderings: put thou my tears into thy bottle: are they not in thy book?", reference: "Psalm 56:8",
    encouragement: "Not one of your tears has slipped by unnoticed; God gathers them like something precious. Your grief is written in His book, which is to say it matters to Him.",
    prayer: "Thank You, Father, that You keep my tears; none of them are wasted." },
  { id: "w159", themeId: "future", cat: ["grief"], scripture: "And ye now therefore have sorrow: but I will see you again, and your heart shall rejoice.", reference: "John 16:22",
    encouragement: "The sorrow is real now, but it is not the closing scene. A reunion is coming that no one will be able to take from you.",
    prayer: "Carry my sorrow toward the joy You have promised." },
  { id: "w160", themeId: "taketh", cat: ["grief"], scripture: "To appoint unto them that mourn in Zion, to give unto them beauty for ashes, the oil of joy for mourning.", reference: "Isaiah 61:3",
    encouragement: "God does more than sweep the ashes away; He has a way of trading them for beauty. What feels like nothing but loss is, in His hands, raw material for something redeemed.",
    prayer: "In time, trade my ashes for beauty; I trust Your hands with my grief." },
  { id: "w161", themeId: "throne", cat: ["decisions"], scripture: "I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.", reference: "Psalm 32:8",
    encouragement: "You are not left to navigate blind; God promises to teach you the way as you walk it. His guidance is close and attentive, like an eye that never leaves you.",
    prayer: "Instruct me and guide me in the way I should go." },
  { id: "w162", themeId: "gaze", cat: ["decisions"], scripture: "The meek will he guide in judgment: and the meek will he teach his way.", reference: "Psalm 25:9",
    encouragement: "Guidance comes to the humble more than the clever. Come ready to be led rather than to be proven right, and He will teach you His way.",
    prayer: "Make me humble enough to be led; teach me Your way." },
  { id: "w163", themeId: "future", cat: ["decisions"], scripture: "Commit thy works unto the LORD, and thy thoughts shall be established.", reference: "Proverbs 16:3",
    encouragement: "Hand the decision to God first, and watch your scattered thoughts begin to settle. Committing it to Him steadies a mind that planning alone never could.",
    prayer: "I commit this to You; settle my thoughts and make the way clear." },
  { id: "w164", themeId: "surrender", cat: ["decisions"], scripture: "Teach me to do thy will; for thou art my God: thy spirit is good; lead me into the land of uprightness.", reference: "Psalm 143:10",
    encouragement: "The best decision starts with wanting His will more than your own preference. Ask not merely for an answer but to be led, and He leads.",
    prayer: "Teach me to do Your will; lead me by Your good Spirit." },
  { id: "w165", themeId: "forgood", cat: ["suffering"], scripture: "But he knoweth the way that I take: when he hath tried me, I shall come forth as gold.", reference: "Job 23:10",
    encouragement: "God knows the exact path you are walking, even the stretch that feels like fire, and the fire refines rather than destroys. You will come out as gold.",
    prayer: "You know my way; bring me through the fire refined, not consumed." },
  { id: "w166", themeId: "patience", cat: ["suffering"], scripture: "For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us.", reference: "Romans 8:18",
    encouragement: "The pain is genuine, yet it is neither the whole story nor the final weight. What is coming is so much greater that it reframes all you are enduring now.",
    prayer: "Lift my eyes to the glory ahead when the present is hard to bear." },
  { id: "w167", themeId: "hand", cat: ["suffering"], scripture: "It is good for me that I have been afflicted; that I might learn thy statutes.", reference: "Psalm 119:71",
    encouragement: "Hard as it is to admit, some lessons arrive only through affliction. A sovereign God can turn even your suffering into a teacher that draws you closer to Him.",
    prayer: "Teach me what only this hard season can, and draw me near." },
  { id: "w168", themeId: "cordial", cat: ["suffering"], scripture: "But the God of all grace, who hath called us unto his eternal glory by Christ Jesus, after that ye have suffered a while, make you perfect, stablish, strengthen, settle you.", reference: "1 Peter 5:10",
    encouragement: "Your suffering is 'a while,' not forever, and it is far from God's last word about you. On the far side He has promised to restore, strengthen, and settle you.",
    prayer: "Carry me through the while of suffering to the steadiness You promise." },
  { id: "w169", themeId: "steadfast", cat: ["suffering"], scripture: "Beloved, think it not strange concerning the fiery trial which is to try you, as though some strange thing happened unto you.", reference: "1 Peter 4:12",
    encouragement: "Trial is no sign your faith has gone wrong; it is part of the road, not a wrong turn off it. You are held through the fire by God, not singled out by chance.",
    prayer: "When the fire comes, steady me; I am not abandoned in it." },
  { id: "w170", themeId: "patience", cat: ["waiting"], scripture: "My soul, wait thou only upon God; for my expectation is from him.", reference: "Psalm 62:5",
    encouragement: "Waiting frays when your hope is pinned to outcomes and steadies when it is pinned to God. Let your expectation rest on Him, more than on the answer you are after.",
    prayer: "My soul waits on You alone; You are my expectation." },
  { id: "w171", themeId: "future", cat: ["waiting"], scripture: "The eyes of all wait upon thee; and thou givest them their meat in due season.", reference: "Psalm 145:15",
    encouragement: "All creation waits on God, and He provides in due season, never late and never early. Your waiting is not being ignored; it is being timed.",
    prayer: "I wait on You; provide in Your due season." },
  { id: "w172", themeId: "anchor", cat: ["waiting"], scripture: "I wait for the LORD, my soul doth wait, and in his word do I hope.", reference: "Psalm 130:5",
    encouragement: "When the wait runs long, anchor your hope to His word rather than to the clock. His promises hold even when the timeline stops making sense.",
    prayer: "I wait, and I hope in Your word; hold me steady." },
  { id: "w173", themeId: "reigns", cat: ["waiting"], scripture: "For since the beginning of the world men have not heard, nor perceived by the ear... what he hath prepared for him that waiteth for him.", reference: "Isaiah 64:4",
    encouragement: "What God is preparing for those who wait outstrips anything you could picture. The wait is not empty time; it is God readying something still unseen.",
    prayer: "I wait for You; I trust what You are preparing that I cannot yet see." },
  { id: "w174", themeId: "shepherd", cat: ["lonely"], scripture: "Lo, I am with you alway, even unto the end of the world.", reference: "Matthew 28:20",
    encouragement: "No day on the calendar, however lonely, falls outside His 'always.' He has pledged His presence to the very end, with no gaps in the coverage.",
    prayer: "Thank You that You are with me always; let me feel it today." },
  { id: "w175", themeId: "love", cat: ["lonely"], scripture: "I will not leave you comfortless: I will come to you.", reference: "John 14:18",
    encouragement: "He will not leave you to manage the emptiness on your own; He comes. The loneliness is real, but it does not get the last word, because He moves toward you.",
    prayer: "You promised not to leave me comfortless; come to me." },
  { id: "w176", themeId: "father", cat: ["lonely"], scripture: "And, behold, I am with thee, and will keep thee in all places whither thou goest.", reference: "Genesis 28:15",
    encouragement: "Wherever you land, even far from everyone you know, He is there and keeping you. His presence is not pinned to a place or a person; it travels where you travel.",
    prayer: "Keep me in every place I go, and let me know You are near." },
  { id: "w177", themeId: "occupied", cat: ["lonely"], scripture: "That they should seek the Lord, if haply they might feel after him, and find him, though he be not far from every one of us.", reference: "Acts 17:27",
    encouragement: "He is never far from any one of us, however isolated you feel tonight. The distance you sense is a feeling, not the fact of where He is.",
    prayer: "You are not far from me; help me reach out and find You near." },
  { id: "w178", themeId: "cordial", cat: ["weary"], scripture: "For which cause we faint not; but though our outward man perish, yet the inward man is renewed day by day.", reference: "2 Corinthians 4:16",
    encouragement: "Your outer strength may be wearing down while God renews the inner person day by day. What you feel on the surface is not the whole story underneath.",
    prayer: "Renew me inwardly day by day, even when I am worn thin." },
  { id: "w179", themeId: "rest", cat: ["weary"], scripture: "For I have satiated the weary soul, and I have replenished every sorrowful soul.", reference: "Jeremiah 31:25",
    encouragement: "God specializes in the depleted; the weary soul is exactly the one He fills. You do not have to generate more energy — you have to come and be replenished.",
    prayer: "Replenish my weary soul; I come to You empty." },
  { id: "w180", themeId: "hand", cat: ["weary"], scripture: "Neither be ye sorry; for the joy of the LORD is your strength.", reference: "Nehemiah 8:10",
    encouragement: "The strength you are scraping for was never finally yours to summon; it is His joy, handed to you. Lean less on grit, more on the gladness that comes from Him.",
    prayer: "Be my strength, God, when my own joy runs dry." },
  { id: "w181", themeId: "throne", cat: ["weary"], scripture: "In the day when I cried thou answeredst me, and strengthenedst me with strength in my soul.", reference: "Psalm 138:3",
    encouragement: "On the day you cry out, He answers, sometimes not by lightening the load but by strengthening the soul beneath it. Help arrives inward before it arrives outward.",
    prayer: "Strengthen my soul today, even before You change my circumstances." },
  { id: "w182", themeId: "comfort", cat: ["guilt"], scripture: "I acknowledged my sin unto thee, and mine iniquity have I not hid... and thou forgavest the iniquity of my sin.", reference: "Psalm 32:5",
    encouragement: "The moment you stop hiding and tell the truth, forgiveness is already waiting to meet you. Confession is no grovel; it is the door out.",
    prayer: "I acknowledge my sin; thank You for forgiving it." },
  { id: "w183", themeId: "cordial", cat: ["guilt"], scripture: "I, even I, am he that blotteth out thy transgressions for mine own sake, and will not remember thy sins.", reference: "Isaiah 43:25",
    encouragement: "God blots out your sins for His own sake, not as wages you earned, and then He chooses to forget them. The record you keep replaying, He has erased.",
    prayer: "Thank You for blotting out my sins and remembering them no more." },
  { id: "w184", themeId: "godhood", cat: ["guilt"], scripture: "If thou, LORD, shouldest mark iniquities, O Lord, who shall stand? But there is forgiveness with thee, that thou mayest be feared.", reference: "Psalm 130:3-4",
    encouragement: "If God kept score the way you keep it, none of us could stand — but He does not. With Him there is forgiveness; that is simply who He is.",
    prayer: "Thank You that with You there is forgiveness; I stand only in that." },
  { id: "w185", themeId: "surrender", cat: ["guilt"], scripture: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.", reference: "2 Corinthians 5:17",
    encouragement: "The version of you that failed does not define you; in Christ it has already passed away. God sees a new creature, and He invites you to see it too.",
    prayer: "Thank You for making me new; help me leave the old behind." },
  { id: "w186", themeId: "faith", cat: ["guilt"], scripture: "In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace.", reference: "Ephesians 1:7",
    encouragement: "Your forgiveness is sized to the riches of His grace, not to the scale of your failure. There is more than enough in Christ to cover all you carry.",
    prayer: "Thank You for redemption and forgiveness in the riches of Your grace." },
  { id: "w187", themeId: "purposed", cat: ["control"], scripture: "I know that thou canst do every thing, and that no thought can be withholden from thee.", reference: "Job 42:2",
    encouragement: "No plan of God can be thwarted, and nothing about your situation lies beyond what He can do. The control you keep grasping at is already perfectly held by Him.",
    prayer: "You can do everything; I release my grip and trust Yours." },
  { id: "w188", themeId: "ruling", cat: ["control"], scripture: "But our God is in the heavens: he hath done whatsoever he hath pleased.", reference: "Psalm 115:3",
    encouragement: "God is not scrambling to react to your circumstances; He reigns over them. What He has been pleased to do stands, and that is your security, not your threat.",
    prayer: "You do as You please from heaven; I rest under Your rule." },
  { id: "w189", themeId: "purposed", cat: ["control"], scripture: "The lot is cast into the lap; but the whole disposing thereof is of the LORD.", reference: "Proverbs 16:33",
    encouragement: "What reads as chance to you is disposed by God down to the smallest roll of the dice. Nothing in your life is truly random; it is all within His ordering.",
    prayer: "What seems random to me is ordered by You; help me trust it." },
  { id: "w190", themeId: "godhood", cat: ["control"], scripture: "For the LORD of hosts hath purposed, and who shall disannul it? and his hand is stretched out, and who shall turn it back?", reference: "Isaiah 14:27",
    encouragement: "No one can cancel what God has purposed or wrench back His outstretched hand. The burden of controlling outcomes is not yours when His hand cannot be reversed.",
    prayer: "No one can turn back Your hand; I lay down what I cannot control." },
  { id: "w191", themeId: "providence", cat: ["control"], scripture: "The counsel of the LORD standeth for ever, the thoughts of his heart to all generations.", reference: "Psalm 33:11",
    encouragement: "Your plans may crumble while His counsel stands through every generation. You can build on something that will not collapse: the settled purposes of God.",
    prayer: "Your counsel stands forever; anchor me to it when my plans fail." },
  { id: "w192", themeId: "cordial", cat: ["gratitude"], scripture: "I will bless the LORD at all times: his praise shall continually be in my mouth.", reference: "Psalm 34:1",
    encouragement: "Praise is not rationed out for the good days only; it is a habit that steadies the one who practices it. Blessing God at all times trains the heart to see Him at all times.",
    prayer: "Let Your praise be continually in my mouth, in every season." },
  { id: "w193", themeId: "throne", cat: ["gratitude"], scripture: "Every good gift and every perfect gift is from above, and cometh down from the Father of lights.", reference: "James 1:17",
    encouragement: "Trace any good thing far enough back and you arrive at God. Every kindness you enjoy came down to you as a gift from the Father.",
    prayer: "Thank You that every good gift comes from You." },
  { id: "w194", themeId: "gaze", cat: ["gratitude"], scripture: "What shall I render unto the LORD for all his benefits toward me?", reference: "Psalm 116:12",
    encouragement: "Gratitude starts with plain counting, and the tally of His benefits soon outruns the tally of your troubles. Look long enough at His kindness and thanks rises on its own.",
    prayer: "I cannot repay Your benefits; let my life be my thanks." },
  { id: "w195", themeId: "surrender", cat: ["gratitude"], scripture: "And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God and the Father by him.", reference: "Colossians 3:17",
    encouragement: "Thanksgiving is less one task among many than a spirit that can run through them all. Whatever today holds, you can do it with gratitude woven through.",
    prayer: "In all I do and say today, let me give You thanks." },
  { id: "w196", themeId: "providence", cat: ["future"], scripture: "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.", reference: "Philippians 1:6",
    encouragement: "God does not walk off from a project half-done, and you are one of His projects. What He began in you He has committed Himself to finish.",
    prayer: "Finish the good work You began in me; I trust Your follow-through." },
  { id: "w197", themeId: "steadfast", cat: ["future"], scripture: "The LORD will perfect that which concerneth me: thy mercy, O LORD, endureth for ever.", reference: "Psalm 138:8",
    encouragement: "The things that weigh on you weigh on Him too, and He has undertaken to perfect them. Your future is His to complete, and His mercy never runs dry.",
    prayer: "Perfect what concerns me; I rest in Your enduring mercy." },
  { id: "w198", themeId: "throne", cat: ["future"], scripture: "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.", reference: "Jeremiah 33:3",
    encouragement: "The future holds things too large for you to foresee, though never too large for God to have prepared. Call on Him; He answers, and He knows what you cannot.",
    prayer: "I call to You about what I cannot see; show me Your way." },
  { id: "w199", themeId: "cordial", cat: ["future"], scripture: "The LORD is my portion, saith my soul; therefore will I hope in him.", reference: "Lamentations 3:24",
    encouragement: "With everything ahead uncertain, one thing is fixed: God Himself is your portion. You can hope toward the future because you already hold the best of it in Him.",
    prayer: "You are my portion; in You I will hope for all that is ahead." },
  { id: "w200", themeId: "foundation", cat: ["change"], scripture: "The heavens shall vanish away like smoke, and the earth shall wax old like a garment... but my salvation shall be for ever.", reference: "Isaiah 51:6",
    encouragement: "Everything you assumed was permanent will eventually wear thin like an old coat; only what God secures endures. Build your weight on the thing that does not vanish.",
    prayer: "Lord, when even solid things pass away, anchor me to Your salvation that lasts forever." },
  { id: "w201", themeId: "godhood", cat: ["change"], scripture: "God is not a man, that he should lie; neither the son of man, that he should repent: hath he said, and shall he not do it?", reference: "Numbers 23:19",
    encouragement: "People shift their minds and break their word; God does neither. Whatever He promised you before this season turned, He will still do.",
    prayer: "You do not change Your word; I hold to Your promises through this change." },
  { id: "w202", themeId: "providence", cat: ["change"], scripture: "He hath made every thing beautiful in his time.", reference: "Ecclesiastes 3:11",
    encouragement: "This in-between season may look unfinished and awkward to you, while God works to a timeline of beauty you cannot yet see. He is making something lovely, in His time rather than yours.",
    prayer: "I trust You to make this beautiful in Your time, not mine." },
  { id: "w203", themeId: "faith", cat: ["change"], scripture: "For we walk by faith, not by sight.", reference: "2 Corinthians 5:7",
    encouragement: "When the road ahead blurs, you move by trusting God rather than by seeing the whole way. Faith is made for exactly these moments when sight gives out.",
    prayer: "When I cannot see the way, help me walk by faith in You." },
  { id: "w204", themeId: "taketh", cat: ["illness"], scripture: "O LORD my God, I cried unto thee, and thou hast healed me.", reference: "Psalm 30:2",
    encouragement: "God hears the cry that rises from a sickbed, and healing, in this life or the next, is never beyond His power. Bring your body to Him honestly; He stays close to the suffering.",
    prayer: "I cry to You from this weakness; heal me as You see fit." },
  { id: "w205", themeId: "comfort", cat: ["illness"], scripture: "But he was wounded for our transgressions, he was bruised for our iniquities... and with his stripes we are healed.", reference: "Isaiah 53:5",
    encouragement: "Whatever your body is doing now, the deepest healing was already secured at the cross. A Savior who bore His own wounds holds you, so that you need not be defined by yours.",
    prayer: "By Your wounds I am healed; hold my hurting body in that truth." },
  { id: "w206", themeId: "father", cat: ["illness"], scripture: "Lord, all my desire is before thee; and my groaning is not hid from thee.", reference: "Psalm 38:9",
    encouragement: "Even the groans you cannot put into words are fully known to Him. Your longing for relief is not hidden; it lies open before a Father who cares.",
    prayer: "You hear my groaning; nothing about my suffering is hidden from You." },
  { id: "w207", themeId: "reigns", cat: ["illness"], scripture: "I kill, and I make alive; I wound, and I heal: neither is there any that can deliver out of my hand.", reference: "Deuteronomy 32:39",
    encouragement: "Life and healing do not lie at the mercy of disease but in the hand of God. The very hand you fear is the only one able to deliver, and it is holding you.",
    prayer: "My life and health are in Your hand; I trust myself to it." },
  { id: "w208", themeId: "shepherd", cat: ["provision"], scripture: "The young lions do lack, and suffer hunger: but they that seek the LORD shall not want any good thing.", reference: "Psalm 34:10",
    encouragement: "Even strong young lions go hungry, while those who seek God lack no good thing. Your security rests in the One you are seeking, not in your resources.",
    prayer: "I seek You; I trust that I shall not lack any good thing." },
  { id: "w209", themeId: "hand", cat: ["provision"], scripture: "Thou openest thine hand, and satisfiest the desire of every living thing.", reference: "Psalm 145:16",
    encouragement: "The same hand that feeds every living creature is open toward you. Provision is never a question of God's ability or willingness, only of His timing.",
    prayer: "You open Your hand to all that lives; I trust You to satisfy my need." },
  { id: "w210", themeId: "future", cat: ["provision"], scripture: "And God is able to make all grace abound toward you; that ye, always having all sufficiency in all things, may abound to every good work.", reference: "2 Corinthians 9:8",
    encouragement: "God's supply runs past bare survival into abundance — enough for you, and enough to spill over to others. He is able, and His grace abounds.",
    prayer: "You are able to make grace abound to me; I trust You for sufficiency." },
  { id: "w211", themeId: "surrender", cat: ["provision"], scripture: "Delight thyself also in the LORD; and he shall give thee the desires of thine heart.", reference: "Psalm 37:4",
    encouragement: "Anchor your delight in God first, and your desires get retuned to what He loves to give. Seek your joy in Him, and provision falls into its right place.",
    prayer: "Let me delight in You first, and trust You with the desires of my heart." },
  { id: "w212", themeId: "patience", cat: ["relationships"], scripture: "A soft answer turneth away wrath: but grievous words stir up anger.", reference: "Proverbs 15:1",
    encouragement: "You cannot control the other person, but you can choose a tone that cools the fire instead of feeding it. A soft answer is often the most powerful thing you carry into the room.",
    prayer: "Give me a soft answer where there is conflict, and guard my words." },
  { id: "w213", themeId: "comfort", cat: ["relationships"], scripture: "And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you.", reference: "Ephesians 4:32",
    encouragement: "The forgiveness you strain to extend, you have already received in fuller measure. Kindness comes easier when you recall how kindly God has dealt with you.",
    prayer: "Help me be kind and forgiving, as You have been with me." },
  { id: "w214", themeId: "surrender", cat: ["relationships"], scripture: "Be not overcome of evil, but overcome evil with good.", reference: "Romans 12:21",
    encouragement: "When someone wrongs you, answering in kind only lets the evil win twice. Hand the justice to God and overcome the wrong with good instead.",
    prayer: "Keep me from being overcome by evil; help me answer it with good." },
  { id: "w215", themeId: "father", cat: ["relationships"], scripture: "Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God.", reference: "1 John 4:7",
    encouragement: "The love a hard relationship demands is not something you manufacture by effort; it is drawn from God, its source. When your own runs dry, go to the well that never does.",
    prayer: "You are the source of love; supply what I cannot produce on my own." },
  { id: "w216", themeId: "future", cat: ["family"], scripture: "Train up a child in the way he should go: and when he is old, he will not depart from it.", reference: "Proverbs 22:6",
    encouragement: "The seeds you plant in your children are not lost, even when no growth shows on the surface. A sovereign God tends what you have sown, across years you cannot yet see.",
    prayer: "Keep working in my children long after my hands have done their part." },
  { id: "w217", themeId: "father", cat: ["family"], scripture: "Can a woman forget her sucking child... yea, they may forget, yet will I not forget thee.", reference: "Isaiah 49:15",
    encouragement: "God's care for your family outlasts even a mother's, and His never fails. The ones you love are remembered by Him more faithfully than you could ever remember them.",
    prayer: "You will not forget mine; I entrust my family to Your unfailing care." },
  { id: "w218", themeId: "cordial", cat: ["family"], scripture: "But the mercy of the LORD is from everlasting to everlasting upon them that fear him, and his righteousness unto children's children.", reference: "Psalm 103:17",
    encouragement: "God's mercy is no one-generation gift; it reaches your children and theirs after them. The faith you live today sends ripples further than you will live to watch.",
    prayer: "Let Your mercy run through my family to generations I will never meet." },
  { id: "w219", themeId: "reigns", cat: ["family"], scripture: "The LORD shall increase you more and more, you and your children.", reference: "Psalm 115:14",
    encouragement: "God's blessing is not a scarce thing you must ration; He delights to increase. Your family's future rests in the hands of One who gives generously.",
    prayer: "Increase and keep my family; I trust them to Your generous hand." },
  { id: "w220", themeId: "surrender", cat: ["anger"], scripture: "He that is slow to anger is better than the mighty; and he that ruleth his spirit than he that taketh a city.", reference: "Proverbs 16:32",
    encouragement: "Real strength shows not in winning the argument but in governing your own spirit. The greater, harder victory is the one you win over your own anger.",
    prayer: "Help me rule my own spirit; that is the battle I most need to win." },
  { id: "w221", themeId: "throne", cat: ["anger"], scripture: "Cease from anger, and forsake wrath: fret not thyself in any wise to do evil.", reference: "Psalm 37:8",
    encouragement: "Nursed anger never punishes the one who wronged you; it only corrodes the one carrying it. You can set it down, because God has not set down justice.",
    prayer: "Help me cease from anger and leave the matter with You." },
  { id: "w222", themeId: "patience", cat: ["anger"], scripture: "Say not thou, I will recompense evil; but wait on the LORD, and he shall save thee.", reference: "Proverbs 20:22",
    encouragement: "Repaying the wrong was never your assignment; waiting on God is. He settles accounts more justly than your anger ever could.",
    prayer: "I will not repay; I wait on You to set things right." },
  { id: "w223", themeId: "ruling", cat: ["anger"], scripture: "Recompense to no man evil for evil. Provide things honest in the sight of all men.", reference: "Romans 12:17",
    encouragement: "Refusing to return evil for evil is not weakness; it is handing the matter to the Ruler of all. He governs the outcome far better than retaliation would.",
    prayer: "Keep me from returning evil for evil; I leave the reckoning to You." },
  { id: "w224", themeId: "faith", cat: ["temptation"], scripture: "Ye are of God, little children, and have overcome them: because greater is he that is in you, than he that is in the world.", reference: "1 John 4:4",
    encouragement: "The pull is real, but it is not the strongest force in the room. The One who lives in you is greater than anything pulling at you.",
    prayer: "You who are in me are greater; strengthen me against the pull." },
  { id: "w225", themeId: "surrender", cat: ["temptation"], scripture: "This I say then, Walk in the Spirit, and ye shall not fulfil the lust of the flesh.", reference: "Galatians 5:16",
    encouragement: "Victory leans less on white-knuckled resistance than on walking close to God. Fill the space with His Spirit and the craving loses its grip.",
    prayer: "Help me walk in Your Spirit, and the pull of the flesh will lose its hold." },
  { id: "w226", themeId: "godhood", cat: ["temptation"], scripture: "For sin shall not have dominion over you: for ye are not under the law, but under grace.", reference: "Romans 6:14",
    encouragement: "Sin is a deposed master, not your owner; it has lost the right to command you. You stand under grace, and grace breaks the old habit's dominion.",
    prayer: "Sin shall not rule me; I stand in Your grace, not under bondage." },
  { id: "w227", themeId: "occupied", cat: ["temptation"], scripture: "Keep thy heart with all diligence; for out of it are the issues of life.", reference: "Proverbs 4:23",
    encouragement: "The battle is won upstream, in what you let your heart dwell on, long before the moment of pull arrives. Guard what occupies your heart and temptation finds less to grab.",
    prayer: "Help me guard my heart, for everything else flows from it." },
  { id: "w228", themeId: "faith", cat: ["doubt"], scripture: "Now faith is the substance of things hoped for, the evidence of things not seen.", reference: "Hebrews 11:1",
    encouragement: "Faith was never meant to be sight; it is confidence about what you cannot yet see. Feeling unsure of the unseen is not failure — it is faith doing its work.",
    prayer: "When I cannot see, give me faith that holds to what is unseen." },
  { id: "w229", themeId: "occupied", cat: ["doubt"], scripture: "I will remember the works of the LORD: surely I will remember thy wonders of old.", reference: "Psalm 77:11",
    encouragement: "When God feels far, memory becomes a lifeline; rehearse out loud what He has already done. Doubt shrinks as you deliberately recall His past faithfulness.",
    prayer: "When You feel distant, help me remember all You have already done." },
  { id: "w230", themeId: "faith", cat: ["doubt"], scripture: "Who is among you that feareth the LORD... that walketh in darkness, and hath no light? let him trust in the name of the LORD, and stay upon his God.", reference: "Isaiah 50:10",
    encouragement: "Even the faithful sometimes walk without any light, and the instruction then is to lean on God rather than gin up feelings. Trust His name when you cannot see His face.",
    prayer: "In the dark, I stay upon You; hold me when I cannot feel You." },
  { id: "w231", themeId: "gaze", cat: ["doubt"], scripture: "But it is good for me to draw near to God: I have put my trust in the Lord GOD.", reference: "Psalm 73:28",
    encouragement: "The cure for feeling far is not to reason your way back but simply to draw near again. Nearness to God is good in itself, even before the questions resolve.",
    prayer: "I draw near to You; that is enough, even with my questions unanswered." },
  { id: "w232", themeId: "future", cat: ["death"], scripture: "For to me to live is Christ, and to die is gain.", reference: "Philippians 1:21",
    encouragement: "For the one who is His, death turns out to be gain rather than loss — more of Christ, not less of life. The fear loosens when the far side is not emptiness but Him.",
    prayer: "Whether I live or die, You are my gain; quiet my fear." },
  { id: "w233", themeId: "triumph", cat: ["death"], scripture: "He will swallow up death in victory; and the Lord GOD will wipe away tears from off all faces.", reference: "Isaiah 25:8",
    encouragement: "Death does not get to keep its captives; God will swallow it whole. The grave is temporary, and His victory over it is forever.",
    prayer: "Thank You that death is swallowed up in Your victory; hold me in that hope." },
  { id: "w234", themeId: "steadfast", cat: ["death"], scripture: "For we know that if our earthly house of this tabernacle were dissolved, we have a building of God, an house not made with hands, eternal in the heavens.", reference: "2 Corinthians 5:1",
    encouragement: "When this fragile tent of a body finally fails, a permanent home stands already built and waiting. You are headed not toward nothing but toward something eternal.",
    prayer: "Thank You for the eternal home You have prepared; steady me with it." },
  { id: "w235", themeId: "triumph", cat: ["death"], scripture: "But God will redeem my soul from the power of the grave: for he shall receive me.", reference: "Psalm 49:15",
    encouragement: "The grave holds power, but never the final power; God redeems and receives His own. You will not be abandoned in the dark — He receives you.",
    prayer: "Redeem me from the grave and receive me; I trust myself to You." },
  { id: "w236", themeId: "anchor", cat: ["overwhelm"], scripture: "The eternal God is thy refuge, and underneath are the everlasting arms.", reference: "Deuteronomy 33:27",
    encouragement: "When you feel yourself falling, there is a floor you cannot fall through: the everlasting arms. Under all the chaos is God Himself, bearing you up.",
    prayer: "When I am sinking, let me feel the everlasting arms beneath me." },
  { id: "w237", themeId: "calm", cat: ["overwhelm"], scripture: "When my spirit was overwhelmed within me, then thou knewest my path.", reference: "Psalm 142:3",
    encouragement: "Even when you have lost the thread of your own life, God has not lost track of your path. Being overwhelmed does not mean you are lost to Him.",
    prayer: "When my spirit is overwhelmed, thank You that You still know my way." },
  { id: "w238", themeId: "throne", cat: ["overwhelm"], scripture: "In my distress I called upon the LORD, and cried unto my God: he heard my voice out of his temple, and my cry came before him.", reference: "Psalm 18:6",
    encouragement: "Your cry from the middle of the mess truly reaches Him; it rises all the way to His throne. You are not shouting into a void — He hears.",
    prayer: "Hear my cry from this distress; let it reach You." },
  { id: "w239", themeId: "foundation", cat: ["overwhelm"], scripture: "But thou, O LORD, art a shield for me; my glory, and the lifter up of mine head.", reference: "Psalm 3:3",
    encouragement: "When everything presses down, God is the One who lifts your head back up. He is a shield around the very part of you that feels most exposed.",
    prayer: "Be my shield, and lift my head when I cannot lift it myself." },
  { id: "w240", themeId: "forgood", cat: ["overwhelm"], scripture: "But we had the sentence of death in ourselves, that we should not trust in ourselves, but in God which raiseth the dead.", reference: "2 Corinthians 1:9",
    encouragement: "Sometimes you are brought to the end of yourself precisely so you will lean on God and not your own strength. The overwhelm may be the very thing turning you toward the One who raises the dead.",
    prayer: "At the end of myself, I stop trusting me and trust You." },
  { id: "w241", themeId: "hand", cat: ["comparison"], scripture: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them.", reference: "Ephesians 2:10",
    encouragement: "You are God's handiwork, set on a path He prepared specifically for you, not a copy of anyone else's. Comparison just measures you against the wrong blueprint.",
    prayer: "Thank You that I am Your workmanship; help me walk my own ordained path." },
  { id: "w242", themeId: "godhood", cat: ["comparison"], scripture: "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people.", reference: "1 Peter 2:9",
    encouragement: "Your identity is fixed not by where you rank among others but by what God calls you: chosen, royal, His. That standing does not slip when someone else pulls ahead.",
    prayer: "You have called me Yours; let that settle the question of who I am." },
  { id: "w243", themeId: "gaze", cat: ["comparison"], scripture: "O LORD, thou hast searched me, and known me.", reference: "Psalm 139:1",
    encouragement: "God knows you fully — not the highlight reel but all of you — and holds you anyway. Comparison loses its grip when you are seen completely by the One whose verdict counts.",
    prayer: "You have searched and known me; help me rest in being seen by You." },
  { id: "w244", themeId: "throne", cat: ["comparison"], scripture: "Fear ye not therefore, ye are of more value than many sparrows.", reference: "Matthew 10:31",
    encouragement: "Your worth is not set by comparison; it is declared by God Himself. He calls you precious, and that valuation does not rise or fall with anyone else's life.",
    prayer: "You call me valuable; quiet the fear that I am not enough." },
  { id: "w245", themeId: "lines", cat: ["gratitude"], scripture: "The lines are fallen unto me in pleasant places; yea, I have a goodly heritage.", reference: "Psalm 16:6",
    encouragement: "Even an ordinary life, seen rightly, is a portion measured out by a generous God. Look again at where your boundaries fell; there is goodness in them.",
    prayer: "Help me see that the lines have fallen for me in pleasant places." },
  { id: "w246", themeId: "peace", cat: ["anxiety"], scripture: "For unto us a child is born... and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.", reference: "Isaiah 9:6",
    encouragement: "The peace you keep chasing is not a technique but a Person, the one called the Prince of Peace. Bring the anxious moment to Him; calm is His to give.",
    prayer: "Prince of Peace, quiet the storm inside me." },
  { id: "w247", themeId: "peace", cat: ["suffering"], scripture: "Now the Lord of peace himself give you peace always by all means.", reference: "2 Thessalonians 3:16",
    encouragement: "Peace is not something you have to generate under pressure; it is a gift the Lord of peace hands out, by every means and at every time. Ask Him for it right in the middle of the trouble.",
    prayer: "Lord of peace, give me Your peace always, even here." },
  { id: "w248", themeId: "rest", cat: ["weary"], scripture: "Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.", reference: "Matthew 11:29",
    encouragement: "The rest He offers is not the absence of work but a better-fitting yoke, His own, that does not crush. Soul-rest comes from walking with Him, not from doing nothing.",
    prayer: "I take Your yoke, Jesus; give my soul the rest You promised." },
  { id: "w249", themeId: "shepherd", cat: ["decisions"], scripture: "And when he putteth forth his own sheep, he goeth before them, and the sheep follow him: for they know his voice.", reference: "John 10:4",
    encouragement: "You do not have to see the whole route; you only have to follow the Shepherd's voice one step at a time. He leads; your part is to keep listening and keep walking.",
    prayer: "Help me know Your voice and follow where You lead." },
  { id: "w250", themeId: "triumph", cat: ["suffering"], scripture: "Nay, in all these things we are more than conquerors through him that loved us.", reference: "Romans 8:37",
    encouragement: "You are not merely surviving what you face; in Christ you are more than a conqueror through the One who loves you. The outcome is not in doubt, because His love is not.",
    prayer: "Make me more than a conqueror through Your love, even in this." },
];

/* --- The 21-day path: "Resting in the Sovereignty of God." --- */
const PLAN_TITLE = "Resting in the Sovereignty of God";
const PLAN = [
  { day: 1, title: "God is God", themeId: "throne", reference: "Psalm 46:10", scripture: "Be still, and know that I am God.",
    reflection: "Before the comfort comes the foundation: God is God, and you are not. That is not a threat but a relief. The whole weight of the world was never yours to hold; you can be still because Someone wiser and stronger is already holding it.",
    prayer: "Lord, quiet me. Help me rest in the truth that You are God and I am not.",
    practice: "Sit quietly for two minutes and say only: You are God." },
  { day: 2, title: "On the throne", themeId: "throne", reference: "Psalm 103:19", scripture: "The LORD hath prepared his throne in the heavens; and his kingdom ruleth over all.",
    reflection: "There is no corner of your life outside His kingdom. The throne is not vacant and the King is not distracted. What feels random to you is ruled by Him — over all, including this.",
    prayer: "Lord, You rule over all. Rule over the part of my life that feels unruled.",
    practice: "Name the one area that feels out of control, and place it under His rule." },
  { day: 3, title: "Working all things", themeId: "throne", reference: "Ephesians 1:11", scripture: "Who worketh all things after the counsel of his own will.",
    reflection: "Not some things — all things, worked according to a settled plan. Pink found nothing so steadying as this. Your life is not a series of accidents He reacts to; it is being worked, on purpose, by a good and deliberate hand.",
    prayer: "Father, You work all things. Help me trust the counsel of Your will.",
    practice: "Look back on one hard thing and ask how He may have been working in it." },
  { day: 4, title: "None can stay His hand", themeId: "anchor", reference: "Daniel 4:35", scripture: "And none can stay his hand, or say unto him, What doest thou?",
    reflection: "No power, no enemy, no fear can reach up and stop the hand of God. The things you dread cannot overrule Him. This is the anchor: His purpose for you cannot be stayed by anything that frightens you.",
    prayer: "Lord, none can stay Your hand. Be my anchor against everything I fear.",
    practice: "Name a fear, then say over it: none can stay His hand." },
  { day: 5, title: "He sees you", themeId: "reigns", reference: "Genesis 16:13", scripture: "Thou God seest me.",
    reflection: "Hagar said this in a wilderness, alone and overlooked. The sovereign God is not a distant administrator; He sees the one person the world walked past. You are not lost in the crowd of His concerns. He sees you.",
    prayer: "Lord, thank You that You see me. Let me live today as one who is seen.",
    practice: "When you feel unnoticed today, remember: the God who reigns sees you." },
  { day: 6, title: "He is good", themeId: "cordial", reference: "Psalm 100:5", scripture: "For the LORD is good; his mercy is everlasting.",
    reflection: "Sovereignty without goodness would be terrifying. But the One in charge is good — not occasionally, but in His very nature. His power is steered by His kindness. You are in the hands of a good King.",
    prayer: "Lord, You are good and Your mercy never ends. Help me trust Your goodness.",
    practice: "List three good gifts from the past week, however small." },
  { day: 7, title: "He does not change", themeId: "rest", reference: "Malachi 3:6", scripture: "For I am the LORD, I change not.",
    reflection: "Your moods change, your circumstances change, your sense of Him changes. He does not. The ground you stand on is not your feelings about God but the unchanging character of God. Rest there.",
    prayer: "Lord, when everything shifts, You remain. Be my unchanging rest.",
    practice: "Finish the sentence: Even when ____ changes, God does not." },
  { day: 8, title: "From His hand", themeId: "hand", reference: "1 Samuel 3:18", scripture: "It is the LORD: let him do what seemeth him good.",
    reflection: "Nothing reaches you that has not first passed through His hands. That changes how you hold the hard things. They are not random blows; they are permitted, measured, and purposed by a God you can trust.",
    prayer: "Father, I receive what comes from Your hand. Teach me to trust it.",
    practice: "Name one hard thing and place it, deliberately, back in His hands." },
  { day: 9, title: "Too wise to err", themeId: "hand", reference: "Romans 11:33", scripture: "How unsearchable are his judgments, and his ways past finding out!",
    reflection: "You will not understand all of it, and you are not required to. Pink said all comes from One too wise to err and too loving to be unkind. Where you cannot trace His hand, you can still trust His heart.",
    prayer: "Lord, where I cannot understand, help me trust Your wisdom and Your love.",
    practice: "Name something you do not understand, and leave it unsolved with Him." },
  { day: 10, title: "All things for good", themeId: "hand", reference: "Romans 8:28", scripture: "And we know that all things work together for good to them that love God.",
    reflection: "Not that all things are good, but that all things are working — woven together toward a good He has promised. Nothing in your life is wasted in His hands. Even this is being made to serve a purpose you will one day be glad of.",
    prayer: "Lord, work even this together for good. I trust the weaver, not the threads.",
    practice: "Thank Him in advance for good you cannot yet see." },
  { day: 11, title: "Peace, be still", themeId: "peace", reference: "Mark 4:39", scripture: "Peace, be still. And the wind ceased, and there was a great calm.",
    reflection: "The same word that calmed the sea can calm you. The storm around you may not stop today — but the storm within you can, when you yield it to His rule. Let Him speak peace into the churning.",
    prayer: "Lord, speak Your peace over the storm inside me.",
    practice: "Take three slow breaths and hand Him the loudest worry on each one." },
  { day: 12, title: "Held secure", themeId: "shepherd", reference: "John 10:28", scripture: "And they shall never perish, neither shall any man pluck them out of my hand.",
    reflection: "You are not kept by the strength of your grip but by the strength of His. On your weakest day you are no less secure, because your safety was never in your hand. Nothing can pluck you out of His.",
    prayer: "Good Shepherd, thank You that I am held by You and cannot be lost.",
    practice: "Picture your name written safely in His hand. Leave it there." },
  { day: 13, title: "Comfort in sorrow", themeId: "comfort", reference: "2 Corinthians 1:3", scripture: "The Father of mercies, and the God of all comfort.",
    reflection: "His sovereignty is not cold. To know God reigns is not to be handed a hard fact but a soft place to fall. Your sorrow is seen, governed, and held by the God of all comfort.",
    prayer: "God of all comfort, meet me in my sorrow with the peace only You can give.",
    practice: "Tell Him honestly about one grief, without tidying it up." },
  { day: 14, title: "He goes before you", themeId: "future", reference: "Deuteronomy 31:8", scripture: "And the LORD, he it is that doth go before thee; he will be with thee.",
    reflection: "He is already standing in your tomorrow. You will not arrive anywhere ahead of Him. Whatever the unknown holds, it does not hold a single moment where He is absent.",
    prayer: "Lord, go before me into the unknown, and let me find You already there.",
    practice: "Name tomorrow's biggest worry and picture Him already in it, waiting." },
  { day: 15, title: "A sure resting-place", themeId: "rest", reference: "Psalm 116:7", scripture: "Return unto thy rest, O my soul; for the LORD hath dealt bountifully with thee.",
    reflection: "Your soul keeps wandering off to find security in outcomes and answers. Pink called the only sure resting-place the perfections of God Himself. Stop chasing the resting-place in your circumstances; return to it in Him.",
    prayer: "Lord, I return to my rest in You. Be my settled ground.",
    practice: "Each time you feel the pull to fix everything today, say: return to your rest." },
  { day: 16, title: "Wait on the Lord", themeId: "patience", reference: "Psalm 27:14", scripture: "Wait on the LORD: be of good courage, and he shall strengthen thine heart.",
    reflection: "Waiting is not the absence of His work; it is often the shape of it. He is not idle in the delay, and neither are you abandoned in it. Take courage — strength is given to those who wait.",
    prayer: "Lord, strengthen my heart while I wait, and help me wait on You.",
    practice: "Name what you are waiting for, and entrust the timing to Him." },
  { day: 17, title: "Cast your care", themeId: "cordial", reference: "1 Peter 5:7", scripture: "Casting all your care upon him; for he careth for you.",
    reflection: "The weight was never meant to stay on your shoulders. You can hand it over — not to chance, but to a God personally concerned with you. He is strong enough to carry it and kind enough to want to.",
    prayer: "Father, I give You what I have been holding. Thank You that You care for me.",
    practice: "Write down one care, then physically set the paper aside as you pray." },
  { day: 18, title: "No fear of the future", themeId: "future", reference: "Jeremiah 29:11", scripture: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
    reflection: "He is not only in control of your future; He is kindly disposed toward it. His thoughts toward you are peace. You can loosen your grip on the unknown, because it is held by Someone who means you well.",
    prayer: "Lord, thank You that Your thoughts toward me are peace. Calm my fear of what is next.",
    practice: "Name one fear about the future and answer it with: His thoughts toward me are peace." },
  { day: 19, title: "Bring it to Him", themeId: "peace", reference: "Philippians 4:6", scripture: "In every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
    reflection: "A sovereign God invites you to ask. Prayer is not informing a distant ruler; it is bringing your real needs to a Father who can actually act. Stop carrying what you were meant to hand over in prayer.",
    prayer: "God, here is what I need, plainly. I trust You with the answer.",
    practice: "Pray one specific request out loud, then thank Him before the answer comes." },
  { day: 20, title: "The triumph of good", themeId: "triumph", reference: "Romans 8:37", scripture: "Nay, in all these things we are more than conquerors through him that loved us.",
    reflection: "The end of the story is not in doubt. Not merely survivors but more than conquerors — because the victory was won by the One who loved you. Whatever today costs, you are on the winning side of a settled story.",
    prayer: "Lord, when the day feels like losing, remind me the outcome is already won.",
    practice: "Name what feels like defeat, and declare over it: more than conquerors." },
  { day: 21, title: "Trust and rest", themeId: "rest", reference: "Proverbs 3:5", scripture: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
    reflection: "This is where the path leads: not to having every answer, but to trusting the One who does. You have spent twenty-one days looking at the God who reigns. Now lean your whole weight on Him, and rest.",
    prayer: "Lord, with all my heart I trust You. I lean on You and not on myself.",
    practice: "Name the one thing you most need to stop figuring out, and hand it to Him." },
];

const ABOUT_LINE = "The sovereignty of God is a truth revealed in Scripture for the comfort of our hearts, the strengthening of our souls, and the blessing of our lives.";

/* --------------------------- storage (graceful) --------------------------- */
/* Native app persistence: localStorage works in the Android WebView and
 * survives app restarts. (No server, no accounts, fully offline.) */
async function storageGet(key) {
  try { const v = localStorage.getItem(key); return v === null ? null : v; } catch (e) { return null; }
}
async function storageSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {}
}

function dayIndex() {
  // Local-midnight day counter so "Today's word" changes at the user's midnight, not UTC's.
  const now = new Date();
  return Math.floor((now.getTime() - now.getTimezoneOffset() * 60000) / 86400000);
}
function wordsForCat(catId) { return WORDS.filter((w) => w.cat.includes(catId)); }

/* Offline keyword matching: turn what someone types into the closest topic,
 * so "Receive a word" feels personal with zero server cost. */
const KEYWORDS = {
  anxiety: ["afraid", "anxious", "anxiety", "worry", "worries", "worried", "scared", "fear", "fearful", "panic", "nervous", "dread", "stress", "overthink"],
  grief: ["grief", "grieve", "grieving", "loss", "lost", "died", "death", "dying", "mourning", "miss", "missing", "gone", "widow", "funeral", "passed away"],
  decisions: ["decision", "decide", "choice", "choose", "unsure", "uncertain", "crossroads", "direction", "confused", "should i", "what to do"],
  suffering: ["pain", "hurt", "hurting", "suffering", "suffer", "sick", "illness", "disease", "diagnosis", "chronic", "ache", "broken"],
  waiting: ["wait", "waiting", "delay", "delayed", "slow", "stuck", "patience", "not yet", "still nothing", "how long"],
  lonely: ["lonely", "alone", "isolated", "unseen", "abandoned", "rejected", "no one", "nobody", "forgotten", "left out"],
  weary: ["tired", "exhausted", "weary", "burnout", "burned out", "drained", "empty", "overwhelmed", "worn out", "spent", "no energy", "can't keep"],
  guilt: ["guilt", "guilty", "regret", "shame", "ashamed", "failed", "failure", "mistake", "unworthy", "my fault", "messed up"],
  control: ["control", "chaos", "unraveling", "falling apart", "out of control", "spinning", "helpless", "powerless", "unruly", "everything is"],
  gratitude: ["thankful", "grateful", "gratitude", "thanks", "blessed", "praise", "rejoice", "joyful", "celebrate"],
  future: ["future", "tomorrow", "what if", "the unknown", "next year", "what's next", "what comes", "uncertain future"],
  change: ["change", "changing", "transition", "moving", "new job", "new chapter", "season", "shifting", "starting over"],
  illness: ["sick", "illness", "ill", "disease", "diagnosis", "cancer", "hospital", "health", "surgery", "recovery"],
  provision: ["money", "bills", "rent", "fired", "laid off", "afford", "broke", "debt", "provision", "provide", "income", "finances"],
  relationships: ["marriage", "spouse", "husband", "wife", "friend", "fight", "argument", "broke up", "divorce", "betrayed", "relationship"],
  family: ["family", "child", "children", "kids", "son", "daughter", "parent", "mother", "father", "parenting", "prodigal"],
  anger: ["angry", "anger", "furious", "rage", "unfair", "injustice", "wronged", "resent", "bitter"],
  temptation: ["temptation", "tempted", "give in", "addiction", "habit", "can't stop", "relapse"],
  doubt: ["doubt", "doubting", "far from god", "silent", "distant", "where is god", "unanswered", "lost my faith"],
  death: ["death", "dying", "heaven", "mortality", "terminal", "end of life", "afterlife", "grave"],
  overwhelm: ["overwhelmed", "too much", "drowning", "buried", "can't cope", "breaking point"],
  comparison: ["comparison", "compare", "behind", "not enough", "everyone else", "less than", "inadequate", "jealous", "envy"],
};
const SUFFIXES = ["", "s", "es", "ed", "ing"];
function matchesWord(t, w) {
  // Word-boundary match with simple inflections: "worry" matches "worrying"
  // and "fears" matches from "fear", but "ill" still won't fire on "will",
  // "son" on "person"/"song", or "anger" on "danger".
  let i = t.indexOf(w);
  while (i !== -1) {
    const before = i === 0 ? " " : t.charAt(i - 1);
    if (!/[a-z]/.test(before)) {
      let j = i + w.length, tail = "";
      while (j < t.length && /[a-z]/.test(t.charAt(j))) tail += t.charAt(j++);
      if (SUFFIXES.includes(tail)) return true;
    }
    i = t.indexOf(w, i + 1);
  }
  return false;
}
function matchCategory(text) {
  // Normalize curly quotes/apostrophes (mobile keyboards) to straight ones.
  const t = (" " + text.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"') + " ");
  let best = null, score = 0;
  for (const cat in KEYWORDS) {
    let s = 0;
    for (const w of KEYWORDS[cat]) if (matchesWord(t, w)) s++;
    if (s > score) { score = s; best = cat; }
  }
  return best;
}

/* =============================== component ================================ */
export default function SteadyWord() {
  const [view, setView] = useState("home"); // home | compose | reading | categories | category | plan | planday | saved | about
  const [word, setWord] = useState(null);
  const [badge, setBadge] = useState(null);
  const [burden, setBurden] = useState("");
  const [activeCat, setActiveCat] = useState(null);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]); // completed plan days
  const seed = useRef(0);

  useEffect(() => {
    (async () => {
      const s = await storageGet("saved-words");
      if (s) { try { setSaved(JSON.parse(s)); } catch (e) {} }
      const d = await storageGet("plan-done");
      if (d) { try { setDone(JSON.parse(d)); } catch (e) {} }
    })();
  }, []);

  function persistSaved(next) { setSaved(next); storageSet("saved-words", JSON.stringify(next)); }
  function persistDone(next) { setDone(next); storageSet("plan-done", JSON.stringify(next)); }

  const isSaved = (w) => !!w && saved.some((s) => s.id === w.id);
  function toggleSave(w) {
    if (!w) return;
    if (isSaved(w)) persistSaved(saved.filter((s) => s.id !== w.id));
    else persistSaved([{ id: w.id, scripture: w.scripture, reference: w.reference, encouragement: w.encouragement, prayer: w.prayer, themeId: w.themeId, practice: w.practice }, ...saved]);
  }

  function show(w, b, nextView) { setWord(w); setBadge(b || null); setView(nextView || "reading"); }

  function receiveWord() {
    const t = burden.trim();
    let pool = WORDS;
    if (t) { const cat = matchCategory(t); if (cat) { const p = wordsForCat(cat); if (p.length) pool = p; } }
    const w = pool[seed.current++ % pool.length];
    show(w, t ? "A word for you" : "A steady word", "reading");
  }

  function todaysWord() { show(WORDS[dayIndex() % WORDS.length], "Today's word", "reading"); }
  function steadyTruth() { show(WORDS[seed.current++ % WORDS.length], "A steady word", "reading"); }

  // "Receive another" follows wherever the current word came from:
  // a browsed topic -> another from that topic; a typed burden -> another for it;
  // today's word or anything else -> a fresh steady word.
  function receiveAnother() {
    if (activeCat && badge === activeCat.label) {
      const p = wordsForCat(activeCat.id);
      if (p.length) { show(p[seed.current++ % p.length], activeCat.label, "reading"); return; }
    }
    if (badge === "A word for you" && burden.trim()) { receiveWord(); return; }
    steadyTruth();
  }

  function openPlanDay(d) {
    const p = PLAN[d];
    show({ id: "plan-" + p.day, themeId: p.themeId, scripture: p.scripture, reference: p.reference, encouragement: p.reflection, prayer: p.prayer, practice: p.practice }, "Day " + p.day + " · " + p.title, "planday");
  }
  function markDay(dayNum) {
    if (done.includes(dayNum)) persistDone(done.filter((x) => x !== dayNum));
    else persistDone([...done, dayNum]);
  }

  const theme = word ? (PINK_THEMES[word.themeId] || PINK_THEMES.throne) : null;

  return (
    <div className="sw-root">
      <style>{css}</style>
      <div className={"sw-horizon" + (view !== "home" ? " is-lit" : "")} aria-hidden="true" />

      <main className="sw-stage">
        {/* ---------------------------- HOME ---------------------------- */}
        {view === "home" && (
          <section className="sw-fade">
            <p className="sw-eyebrow">A. W. Pink &middot; The Sovereignty of God</p>
            <h1 className="sw-hero">A Steady Word</h1>
            <p className="sw-lede">Encouragement for a hard day, anchored in the God who reigns over all of it.</p>

            <div className="sw-menu">
              <button className="sw-card sw-card-lead" onClick={() => setView("compose")}>
                <span className="sw-card-t">Receive a word</span>
                <span className="sw-card-d">Tell Him what is weighing on you, and receive Scripture, encouragement, and prayer.</span>
              </button>
              <button className="sw-card" onClick={todaysWord}>
                <span className="sw-card-t">Today&rsquo;s word</span>
                <span className="sw-card-d">One steady truth to carry through the day.</span>
              </button>
              <button className="sw-card" onClick={() => setView("categories")}>
                <span className="sw-card-t">What are you facing?</span>
                <span className="sw-card-d">Find words for fear, grief, waiting, weariness, and more.</span>
              </button>
              <button className="sw-card" onClick={() => setView("plan")}>
                <span className="sw-card-t">The 21-day path</span>
                <span className="sw-card-d">{PLAN_TITLE}. {done.length}/{PLAN.length} complete.</span>
              </button>
              <button className="sw-card" onClick={() => setView("saved")}>
                <span className="sw-card-t">Saved words</span>
                <span className="sw-card-d">{saved.length === 0 ? "Words you keep will gather here." : saved.length + " saved."}</span>
              </button>
            </div>
            <button className="sw-textlink" onClick={() => setView("about")}>About this book &amp; these words</button>
          </section>
        )}

        {/* --------------------------- COMPOSE -------------------------- */}
        {view === "compose" && (
          <section className="sw-fade">
            <BackBar label="Home" onBack={() => setView("home")} />
            <h2 className="sw-h2">What is weighing on you?</h2>
            <p className="sw-sub">Name what is heavy, and receive a word that meets it. You can also leave this blank.</p>
            <textarea className="sw-input" rows={3} placeholder="Fear, grief, a decision, a person, the unknown…"
              value={burden} onChange={(e) => setBurden(e.target.value)} />
            <button className="sw-primary" onClick={receiveWord}>Receive a word</button>
            <button className="sw-secondary" onClick={steadyTruth}>Or give me a steady truth</button>
          </section>
        )}

        {/* ------------------- READING (a single word) ------------------ */}
        {(view === "reading" || view === "planday") && word && theme && (
          <section className="sw-fade">
            <BackBar label={view === "planday" ? "The path" : "Home"} onBack={() => setView(view === "planday" ? "plan" : "home")} />
            <WordCard word={word} theme={theme} badge={badge} isSaved={isSaved(word)} onToggleSave={() => toggleSave(word)} />

            {view === "planday" && (
              <button className={"sw-secondary" + (done.includes(planNum(badge)) ? " is-on" : "")} onClick={() => markDay(planNum(badge))}>
                {done.includes(planNum(badge)) ? "✓ Marked complete" : "Mark today complete"}
              </button>
            )}
            {view === "reading" && (
              <div className="sw-actions">
                <button className="sw-secondary" onClick={receiveAnother}>Receive another</button>
                <button className="sw-ghost" onClick={() => setView("home")}>Back to home</button>
              </div>
            )}
          </section>
        )}

        {/* -------------------------- CATEGORIES ------------------------ */}
        {view === "categories" && (
          <section className="sw-fade">
            <BackBar label="Home" onBack={() => setView("home")} />
            <h2 className="sw-h2">What are you facing?</h2>
            <p className="sw-sub">Choose what is closest. Each opens words for that moment.</p>
            <div className="sw-cats">
              {CATEGORIES.map((c) => (
                <button key={c.id} className="sw-cat" onClick={() => { setActiveCat(c); setView("category"); }}>
                  <span className="sw-cat-t">{c.label}</span>
                  <span className="sw-cat-d">{c.blurb}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ----------------------- ONE CATEGORY ------------------------- */}
        {view === "category" && activeCat && (
          <section className="sw-fade">
            <BackBar label="All topics" onBack={() => setView("categories")} />
            <h2 className="sw-h2">{activeCat.label}</h2>
            <p className="sw-sub">{activeCat.blurb}</p>
            <div className="sw-list">
              {wordsForCat(activeCat.id).map((w) => (
                <button key={w.id} className="sw-row" onClick={() => show(w, activeCat.label, "reading")}>
                  <span className="sw-row-ref">{w.reference}</span>
                  <span className="sw-row-scr">{w.scripture}</span>
                  <span className="sw-row-theme">{PINK_THEMES[w.themeId] ? PINK_THEMES[w.themeId].label : ""}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ---------------------------- PLAN ---------------------------- */}
        {view === "plan" && (
          <section className="sw-fade">
            <BackBar label="Home" onBack={() => setView("home")} />
            <p className="sw-eyebrow">A 21-day path</p>
            <h2 className="sw-h2">{PLAN_TITLE}</h2>
            <p className="sw-sub">A short reading each day — Scripture, a reflection, a prayer, and one thing to practice. {done.length}/{PLAN.length} complete.</p>
            <div className="sw-list">
              {PLAN.map((p, i) => (
                <button key={p.day} className={"sw-row sw-row-day" + (done.includes(p.day) ? " is-done" : "")} onClick={() => openPlanDay(i)}>
                  <span className="sw-day-n">{done.includes(p.day) ? "✓" : p.day}</span>
                  <span className="sw-day-body">
                    <span className="sw-row-scr">{p.title}</span>
                    <span className="sw-row-theme">{p.reference}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* --------------------------- SAVED ---------------------------- */}
        {view === "saved" && (
          <section className="sw-fade">
            <BackBar label="Home" onBack={() => setView("home")} />
            <h2 className="sw-h2">Saved words</h2>
            {saved.length === 0 ? (
              <p className="sw-sub">Nothing saved yet. Tap the mark on any word to keep it here.</p>
            ) : (
              <div className="sw-list">
                {saved.map((w) => (
                  <button key={w.id} className="sw-row" onClick={() => show(w, "Saved", "reading")}>
                    <span className="sw-row-ref">{w.reference}</span>
                    <span className="sw-row-scr">{w.scripture}</span>
                    <span className="sw-row-theme">{PINK_THEMES[w.themeId] ? PINK_THEMES[w.themeId].label : ""}</span>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* --------------------------- ABOUT ---------------------------- */}
        {view === "about" && (
          <section className="sw-fade">
            <BackBar label="Home" onBack={() => setView("home")} />
            <h2 className="sw-h2">About these words</h2>
            <p className="sw-about">A Steady Word offers encouragement rooted in one old and steadying truth: that God reigns over all things, and that nothing reaches you outside His care.</p>
            <figure className="sw-pink" style={{ animation: "none", opacity: 1 }}>
              <p className="sw-pink-label">A. W. Pink</p>
              <blockquote className="sw-pink-quote">{ABOUT_LINE}</blockquote>
              <figcaption className="sw-pink-cite">A.&nbsp;W.&nbsp;Pink, <span>The Sovereignty of God</span></figcaption>
            </figure>
            <p className="sw-about">Every quotation is drawn from the original public-domain editions of Pink&rsquo;s 1918 classic. Scripture is from the King James Version. The reflections and prayers are written to carry Pink&rsquo;s comfort in plain, everyday language.</p>
          </section>
        )}
      </main>

      <footer className="sw-foot">Words of A.&nbsp;W.&nbsp;Pink, The Sovereignty of God (1918) &middot; Scripture, King James Version</footer>
    </div>
  );
}

function planNum(badge) { if (!badge) return -1; const m = badge.match(/^Day (\d+)/); return m ? parseInt(m[1], 10) : -1; }

function BackBar({ label, onBack }) {
  return <button className="sw-back" onClick={onBack}>&larr; {label}</button>;
}

function WordCard({ word, theme, badge, isSaved, onToggleSave }) {
  return (
    <div className="sw-word">
      <div className="sw-word-top">
        {badge && <span className="sw-badge">{badge}</span>}
        <button className={"sw-save" + (isSaved ? " is-on" : "")} onClick={onToggleSave} aria-label={isSaved ? "Remove from saved" : "Save this word"} title={isSaved ? "Saved" : "Save"}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <Emblem />
      <blockquote className="sw-scripture" style={{ animationDelay: "0.1s" }}>{word.scripture}</blockquote>
      <p className="sw-ref" style={{ animationDelay: "0.28s" }}>{word.reference}</p>
      <p className="sw-encouragement" style={{ animationDelay: "0.46s" }}>{word.encouragement}</p>

      <figure className="sw-pink" style={{ animationDelay: "0.66s" }}>
        <p className="sw-pink-label">{theme.label}</p>
        <blockquote className="sw-pink-quote">{theme.quote}</blockquote>
        <figcaption className="sw-pink-cite">A.&nbsp;W.&nbsp;Pink, <span>The Sovereignty of God</span></figcaption>
      </figure>

      {word.prayer && <p className="sw-prayer" style={{ animationDelay: "0.84s" }}>{word.prayer}</p>}
      {word.practice && (
        <div className="sw-practice" style={{ animationDelay: "0.96s" }}>
          <span className="sw-practice-l">Today, try this</span>
          <span>{word.practice}</span>
        </div>
      )}
    </div>
  );
}

function Emblem() {
  return (
    <svg className="sw-emblem" width="48" height="34" viewBox="0 0 48 34" fill="none" aria-hidden="true">
      <line x1="2" y1="29" x2="46" y2="29" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="24" cy="29" r="9" stroke="currentColor" strokeWidth="1.2" fill="none" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const a = Math.PI * (1 - i / 6);
        return <line key={i} x1={24 + Math.cos(a) * 13} y1={29 - Math.sin(a) * 13} x2={24 + Math.cos(a) * 17} y2={29 - Math.sin(a) * 17} stroke="currentColor" strokeWidth="1" opacity="0.8" />;
      })}
    </svg>
  );
}

const css = `
/* Fonts are bundled locally via @fontsource (see main.jsx) — no network import. */

:root { color-scheme: dark; }
*, *::before, *::after { box-sizing: border-box; }
html, body { max-width: 100%; overflow-x: hidden; margin: 0; background:#0C1925; color:#ECE3CF; }
html { -webkit-text-size-adjust: 100%; }

.sw-root{
  --ink:#0C1925; --deep:#13283A; --bone:#ECE3CF; --bone-dim:rgba(236,227,207,.60);
  --gold:#C9A14C; --gold-soft:rgba(201,161,76,.55); --line:rgba(236,227,207,.14);
  position:relative; min-height:100vh; width:100%;
  background:linear-gradient(180deg,var(--ink) 0%,var(--deep) 62%,#16324a 100%);
  color:var(--bone); font-family:'EB Garamond',Georgia,serif;
  display:flex; flex-direction:column; align-items:center; overflow-x:hidden;
}
.sw-horizon{ position:fixed; left:50%; bottom:-170px; transform:translateX(-50%); width:150%; height:340px;
  pointer-events:none; background:radial-gradient(ellipse at center,var(--gold-soft) 0%,rgba(201,161,76,.10) 35%,transparent 70%);
  opacity:.16; transition:opacity 1.6s ease, bottom 1.6s ease; }
.sw-horizon.is-lit{ opacity:.42; bottom:-130px; }

.sw-stage{ position:relative; z-index:1; width:100%; max-width:600px; padding:54px 24px 36px; margin:0 auto; flex:1; }
.sw-fade{ animation:fade .5s ease both; }
@keyframes fade{ from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:translateY(0);} }

.sw-eyebrow{ font-family:ui-sans-serif,system-ui,sans-serif; text-transform:uppercase; letter-spacing:.26em;
  font-size:11px; color:var(--gold); margin:0 0 18px; font-weight:600; }
.sw-hero{ font-family:'Cormorant Garamond',serif; font-weight:600; font-size:clamp(40px,11vw,60px);
  line-height:1.0; letter-spacing:.01em; margin:0 0 16px; }
.sw-lede{ font-size:clamp(16px,4.4vw,19px); line-height:1.55; color:var(--bone-dim); margin:0 0 32px; max-width:42ch; }
.sw-h2{ font-family:'Cormorant Garamond',serif; font-weight:600; font-size:clamp(28px,7vw,38px); line-height:1.1; margin:14px 0 8px; }
.sw-sub{ font-size:clamp(15px,4vw,17px); line-height:1.5; color:var(--bone-dim); margin:0 0 26px; max-width:46ch; }
.sw-about{ font-size:clamp(16px,4.2vw,18px); line-height:1.6; color:var(--bone); margin:0 0 22px; max-width:48ch; }

/* menu */
.sw-menu{ display:flex; flex-direction:column; gap:11px; margin-bottom:22px; }
.sw-card{ text-align:left; cursor:pointer; background:rgba(236,227,207,.04); border:1px solid var(--line);
  border-radius:5px; padding:18px 18px; display:flex; flex-direction:column; gap:5px;
  transition:border-color .2s ease, background .2s ease, transform .2s ease; }
.sw-card:hover{ border-color:var(--gold-soft); background:rgba(236,227,207,.07); transform:translateY(-1px); }
.sw-card-lead{ background:rgba(201,161,76,.10); border-color:var(--gold-soft); }
.sw-card-t{ font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:600; color:var(--bone); }
.sw-card-d{ font-size:14.5px; line-height:1.45; color:var(--bone-dim); }
.sw-textlink{ background:none; border:none; cursor:pointer; color:var(--bone-dim); font-family:ui-sans-serif,system-ui,sans-serif;
  font-size:12px; letter-spacing:.08em; text-transform:uppercase; padding:6px 0; transition:color .2s ease; }
.sw-textlink:hover{ color:var(--gold); }

/* inputs & buttons */
.sw-input{ width:100%; box-sizing:border-box; resize:none; background:rgba(236,227,207,.05); border:1px solid var(--line);
  border-radius:3px; color:var(--bone); font-family:'EB Garamond',serif; font-size:18px; line-height:1.5;
  padding:14px 15px; margin-bottom:18px; transition:border-color .25s, background .25s; }
.sw-input::placeholder{ color:rgba(236,227,207,.34); font-style:italic; }
.sw-input:focus{ outline:none; border-color:var(--gold-soft); background:rgba(236,227,207,.08); }
.sw-primary{ width:100%; cursor:pointer; font-family:ui-sans-serif,system-ui,sans-serif; text-transform:uppercase;
  letter-spacing:.2em; font-size:12px; font-weight:600; color:var(--ink); background:var(--gold); border:none;
  border-radius:3px; padding:16px 20px; margin-bottom:12px; transition:transform .2s, filter .2s; }
.sw-primary:hover:not(:disabled){ filter:brightness(1.07); transform:translateY(-1px); }
.sw-primary:disabled{ opacity:.6; cursor:default; }
.sw-secondary{ width:100%; cursor:pointer; background:transparent; font-family:ui-sans-serif,system-ui,sans-serif;
  text-transform:uppercase; letter-spacing:.16em; font-size:11px; color:var(--bone-dim); border:1px solid var(--line);
  border-radius:3px; padding:13px 18px; margin-bottom:10px; transition:color .2s, border-color .2s; }
.sw-secondary:hover{ color:var(--bone); border-color:var(--gold-soft); }
.sw-secondary.is-on{ color:var(--gold); border-color:var(--gold-soft); }
.sw-ghost{ width:100%; cursor:pointer; background:transparent; border:none; font-family:ui-sans-serif,system-ui,sans-serif;
  text-transform:uppercase; letter-spacing:.16em; font-size:11px; color:rgba(236,227,207,.4); padding:12px 18px; transition:color .2s; }
.sw-ghost:hover{ color:var(--bone-dim); }
.sw-back{ background:none; border:none; cursor:pointer; color:var(--bone-dim); font-family:ui-sans-serif,system-ui,sans-serif;
  font-size:12px; letter-spacing:.1em; text-transform:uppercase; padding:0 0 22px; transition:color .2s; }
.sw-back:hover{ color:var(--gold); }

/* category grid + lists */
.sw-cats{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.sw-cat{ text-align:left; cursor:pointer; background:rgba(236,227,207,.04); border:1px solid var(--line); border-radius:5px;
  padding:15px 14px; display:flex; flex-direction:column; gap:4px; transition:border-color .2s, background .2s; }
.sw-cat:hover{ border-color:var(--gold-soft); background:rgba(236,227,207,.07); }
.sw-cat-t{ font-family:'Cormorant Garamond',serif; font-size:19px; font-weight:600; color:var(--bone); line-height:1.1; }
.sw-cat-d{ font-size:13px; line-height:1.35; color:var(--bone-dim); }

.sw-list{ display:flex; flex-direction:column; gap:9px; }
.sw-row{ text-align:left; cursor:pointer; background:rgba(236,227,207,.04); border:1px solid var(--line); border-radius:5px;
  padding:15px 16px; display:flex; flex-direction:column; gap:6px; transition:border-color .2s, background .2s; }
.sw-row:hover{ border-color:var(--gold-soft); background:rgba(236,227,207,.07); }
.sw-row-ref{ font-family:ui-sans-serif,system-ui,sans-serif; font-size:10.5px; letter-spacing:.18em; text-transform:uppercase; color:var(--gold); }
.sw-row-scr{ font-family:'Cormorant Garamond',serif; font-size:19px; font-style:italic; line-height:1.3; color:var(--bone); }
.sw-row-theme{ font-family:ui-sans-serif,system-ui,sans-serif; font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; color:var(--bone-dim); }

.sw-row-day{ flex-direction:row; align-items:center; gap:14px; }
.sw-day-n{ flex:0 0 36px; height:36px; width:36px; border-radius:50%; border:1px solid var(--gold-soft);
  display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--gold); }
.sw-row-day.is-done .sw-day-n{ background:var(--gold); color:var(--ink); border-color:var(--gold); }
.sw-day-body{ display:flex; flex-direction:column; gap:3px; }

/* the word */
.sw-word{ text-align:center; }
.sw-word-top{ display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; min-height:24px; }
.sw-badge{ font-family:ui-sans-serif,system-ui,sans-serif; font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:var(--gold); }
.sw-save{ background:none; border:none; cursor:pointer; color:rgba(236,227,207,.42); padding:4px; transition:color .2s, transform .2s; margin-left:auto; }
.sw-save:hover{ color:var(--gold); }
.sw-save.is-on{ color:var(--gold); }
.sw-emblem{ color:var(--gold); display:block; margin:8px auto 24px; opacity:0; animation:rise .9s ease forwards; }
.sw-scripture{ font-family:'Cormorant Garamond',serif; font-style:italic; font-weight:500; font-size:clamp(24px,6.4vw,33px);
  line-height:1.32; margin:0 0 16px; padding:0; border:none; color:var(--bone); opacity:0; animation:rise .9s ease forwards; }
.sw-ref{ font-family:ui-sans-serif,system-ui,sans-serif; text-transform:uppercase; letter-spacing:.24em; font-size:11px;
  color:var(--gold); margin:0 0 28px; opacity:0; animation:rise .9s ease forwards; }
.sw-encouragement{ font-size:clamp(16.5px,4.4vw,19px); line-height:1.66; color:var(--bone); margin:0 auto 28px; max-width:48ch;
  opacity:0; animation:rise .9s ease forwards; text-align:left; }
.sw-pink{ margin:0 auto 28px; max-width:46ch; padding:24px 0 0; border-top:1px solid rgba(201,161,76,.28);
  opacity:0; animation:rise .9s ease forwards; text-align:center; }
.sw-pink-label{ font-family:ui-sans-serif,system-ui,sans-serif; text-transform:uppercase; letter-spacing:.22em; font-size:10px; color:var(--gold); margin:0 0 12px; }
.sw-pink-quote{ font-family:'Cormorant Garamond',serif; font-weight:500; font-size:clamp(18px,4.6vw,21px); line-height:1.45;
  color:var(--bone-dim); margin:0 0 12px; padding:0; border:none; }
.sw-pink-cite{ font-family:ui-sans-serif,system-ui,sans-serif; font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:rgba(236,227,207,.42); }
.sw-pink-cite span{ font-style:normal; }
.sw-prayer{ font-style:italic; font-size:clamp(15px,4vw,17px); line-height:1.6; color:var(--bone-dim); margin:0 auto 28px;
  max-width:44ch; opacity:0; animation:rise .9s ease forwards; }
.sw-practice{ display:flex; flex-direction:column; gap:7px; max-width:44ch; margin:0 auto 30px; padding:18px 18px;
  border:1px solid var(--line); border-radius:5px; background:rgba(236,227,207,.04); font-size:16px; line-height:1.5;
  color:var(--bone); opacity:0; animation:rise .9s ease forwards; }
.sw-practice-l{ font-family:ui-sans-serif,system-ui,sans-serif; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); }
.sw-actions{ display:flex; flex-direction:column; gap:10px; max-width:340px; margin:8px auto 0; }

.sw-foot{ position:relative; z-index:1; font-family:ui-sans-serif,system-ui,sans-serif; font-size:10px; letter-spacing:.1em;
  text-transform:uppercase; color:rgba(236,227,207,.26); padding:0 20px 26px; text-align:center; }

@keyframes rise{ from{opacity:0; transform:translateY(14px);} to{opacity:1; transform:translateY(0);} }
button:focus-visible, .sw-input:focus-visible{ outline:2px solid var(--gold); outline-offset:2px; }
@media (max-width:380px){ .sw-cats{ grid-template-columns:1fr; } }
@media (prefers-reduced-motion:reduce){
  .sw-fade,.sw-emblem,.sw-scripture,.sw-ref,.sw-encouragement,.sw-pink,.sw-prayer,.sw-practice{ animation:none; opacity:1; transform:none; }
  .sw-horizon{ transition:none; }
}
`;
