---
title: "SHAKEN/STIR explained: what A, B, and C attestation mean for your answer rates"
description: A plain-English guide to SHAKEN/STIR call attestation, why your attestation grade decides whether calls show as Spam Likely, and how to check what grade your numbers earn.
pubDate: 2026-05-26
tags: ['SHAKEN/STIR', 'attestation', 'call deliverability']
---

If your outbound calls are landing as "Spam Likely" or going straight to voicemail, the problem may not be your list or your reps. It may be your attestation grade: a behind-the-scenes score that carriers attach to every call you place, which most callers have never heard of and cannot see.

This guide explains SHAKEN/STIR, what the A, B, and C grades actually mean, why they decide whether your calls get answered, and how to find out what grade your own numbers are earning right now. One practical way to check is to call a [seed lead](/blog/decoy-leads-seed-leads-test-leads/) you control and read the attestation grade and spam score it records for the incoming call.

## What SHAKEN/STIR is

SHAKEN/STIR is a framework that lets carriers cryptographically vouch for who is placing a call. The names are backronyms: STIR stands for Secure Telephone Identity Revisited, and SHAKEN stands for Signature-based Handling of Asserted Information Using toKENs. You do not need to remember either. What matters is the job they do.

For decades, the caller ID on a phone call was trivial to fake. Anyone could put any number in the "from" field, which is what made robocalls and spoofing so easy and so destructive. SHAKEN/STIR fixes the trust gap. When you place a call, your originating carrier attaches a digital signature that says, in effect, "we know this caller and we vouch for their right to use this number." The receiving carrier checks that signature and decides how much to trust the call before it rings.

That trust decision is expressed as an attestation level.

## The three attestation levels

Every signed call carries one of three grades. The grade is assigned by your originating carrier, not by you, and it reflects how confident that carrier is about your relationship to the number you are calling from.

**Attestation A (Full).** The carrier knows you and confirms you are authorized to use the calling number. This is the highest level of trust. Calls with full attestation are the least likely to be flagged as spam and the most likely to display a verified indicator on the recipient's phone.

**Attestation B (Partial).** The carrier knows you (the customer originating the call) but cannot confirm that you are authorized to use that specific number. This is common when calls route through a platform or a number that is not directly registered to the caller. Partial attestation is treated with more suspicion than full.

**Attestation C (Gateway).** The carrier is simply passing the call along and cannot vouch for its origin at all. This is the weakest level. Calls with gateway attestation are the most likely to be downgraded, labeled, or blocked.

A useful way to remember it: A means "we vouch for the caller and the number," B means "we vouch for the caller but not this number," and C means "we are just the messenger."

## Why your grade decides whether calls get answered

Attestation is an input, not the final verdict. Receiving carriers and third-party analytics services combine your attestation level with other signals, such as call volume, complaint history, and how often your numbers are answered, to decide what label to show. But attestation is a heavy input, and a low grade works against you in every one of those calculations.

The practical chain looks like this:

- A low attestation grade makes a call easier to treat as suspicious.
- Suspicious calls get labeled "Spam Likely" or "Scam Likely," or silently sent to voicemail.
- Labeled calls get answered far less often, because people do not pick up calls marked as spam.
- Low answer rates feed back into the analytics as further evidence that your numbers are low quality, which reinforces the labeling.

This is why a campaign can degrade over time even when nothing about your offer or list has changed. The attestation and reputation signals compound. A number that starts at grade C and gets few answers can spiral into being blocked outright.

## Why good callers still get low grades

It is frustrating, because legitimate businesses are caught by this constantly. Common causes include:

- **Routing through a provider that does not register your numbers properly**, which caps you at B or C even though you are a real, authorized caller.
- **Using numbers that are not tied to your verified identity**, so the carrier cannot assert the number even when it can assert you.
- **High-volume dialing from a small pool of numbers**, which triggers spam analytics independent of attestation and drags down answer rates that then hurt your reputation.
- **Numbers with a history**, where a recycled number arrives already carrying complaints from a previous user.

The hard part is that you usually cannot see any of this from your own phone. You dial out, the call connects or it does not, and you never learn what grade the receiving carrier saw or what label the recipient's screen displayed.

## How to find out what grade your numbers earn

The only reliable way to know how your calls are treated is to observe a call you place arriving on a line you control, and read the attestation the receiving side actually saw.

This is one use of a seed lead. A seed is a phone number and identity you own, placed inside a real flow so that calls reach it naturally. When someone dials that number, you are on the receiving end, which means you can capture exactly what the recipient's carrier saw: the attestation grade attached to the call (A, B, or C) and any spam-risk scoring applied to it. Because the seed also records the call, you can pair the technical grade with what was actually said.

DummyLead grades both spam risk and attestation level on every inbound call to a seed, which turns an invisible carrier-side signal into something you can see and act on. Instead of guessing why answer rates are low, you can confirm whether your own numbers are arriving as grade A or being quietly downgraded to C.

## What to do once you know your grade

If your calls are landing at B or C, the fixes are concrete:

- **Register your numbers properly** with your carrier or provider so they can be fully attested. This single step is often what moves a campaign from C to A.
- **Use numbers tied to your verified business identity** rather than generic pooled numbers.
- **Spread volume across an appropriate number of lines** so you do not trip spam analytics that hurt reputation regardless of attestation.
- **Monitor over time**, because attestation and reputation drift. A number that is grade A today can degrade if your dialing patterns change.

The core lesson is that answer rates are not just a function of your offer. They are a function of whether the phone network trusts you, and that trust is measurable. Once you can see your own attestation grade, you can stop treating poor pickup rates as a mystery and start treating them as a problem with a known cause.
