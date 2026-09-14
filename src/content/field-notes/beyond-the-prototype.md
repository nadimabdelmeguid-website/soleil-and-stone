---
title: "Beyond the Prototype"
description: "Why hardware teams often underestimate the transition from a working prototype to manufacturing—and how compressed EVT, DVT, and PVT cycles can quietly push time-to-market off schedule."
published: 2026-09-18

category: "Hardware & Manufacturing"
categorySlug: "hardware"

featured: true
draft: false

author: "Nadim Abdel Meguid"
---

A working prototype can create a dangerous sense of proximity.

The electronics turn on. The mechanical parts fit together. The core function works. Maybe customers, investors, or internal stakeholders have already seen the product in action.

At that point, manufacturing can feel like the next logical step.

But a prototype only proves that a product **can work**.

It does not prove that the product can be manufactured repeatedly, at the expected quality, at the target cost, and on the timeline the company has planned.

That transition is where I have seen some of the biggest challenges in hardware development begin.

A team may have spent months reaching its first functional prototype, only to underestimate how much development still remains once Design for Manufacturing begins and the product moves through EVT, DVT, and PVT.

The result is often not a failed product.

It is a delayed one.

And in hardware, those delays can compound quickly.

## A Prototype Proves Possibility, Not Production

The mental model after a successful prototype can look deceptively simple:

**Prototype → finalize the design → manufacture → launch.**

The actual path is rarely that clean.

Once a product begins moving toward manufacturing, new constraints start appearing.

A component may need to move.

That change affects the enclosure.

The enclosure change affects tooling.

A supplier may identify a tolerance that is difficult to hold consistently.

A test may expose a weakness that never appeared in the first prototypes.

A component that was easy to source for ten units may have a completely different lead time when the requirement becomes thousands.

An assembly method that works when an engineer builds a device by hand may become inefficient or unreliable on a production line.

None of these issues necessarily means that the original engineering was poor.

They are part of the transition from proving an idea to building a repeatable product.

The question changes from:

**Can we make this work?**

to:

**Can we make this work consistently, repeatedly, economically, and at scale?**

That second question is much harder.

## DFM Is Where Reality Starts Pushing Back

Design for Manufacturing is sometimes treated as something that happens once the product design is largely complete.

In practice, it can reveal how many assumptions were embedded in the prototype.

A prototype can tolerate decisions that production cannot.

When only a handful of units are being built, an engineer can work around awkward assembly, unusual tolerances, expensive components, or manual adjustments.

Production removes much of that flexibility.

Now the team needs to understand:

- whether components can be sourced at the required volume,
- whether tolerances are realistic for the intended manufacturing process,
- whether the product can be assembled efficiently,
- whether it can be tested consistently,
- whether manufacturing variation affects performance,
- whether suppliers can meet the expected lead times,
- and whether the final process still supports the target product cost.

Each answer can create another engineering iteration.

And this is where schedule assumptions become critical.

## EVT, DVT and PVT Are Learning Loops

Hardware development commonly moves through some version of three major validation stages:

**EVT — Engineering Validation Test**

The team is proving that the engineering implementation works and identifying the technical problems that still need to be solved.

**DVT — Design Validation Test**

The design is getting closer to its final configuration, and the team validates whether the product meets its specifications and expected use conditions.

**PVT — Production Validation Test**

The focus moves toward proving that the product can actually be manufactured using the intended production process.

On a project plan, these stages can appear beautifully sequential:

**EVT → DVT → PVT → Production**

But those arrows hide most of the work.

Each phase is really a feedback loop:

**Build → test → learn → modify → build again.**

The number of iterations required is difficult to predict perfectly because the purpose of validation is precisely to uncover things the team did not know before the build.

That uncertainty needs to be part of the schedule.

One of the patterns I have seen is teams underestimating the number of iterations needed during EVT.

Sometimes the pressure comes from cost.

Every prototype build costs money.

Every redesign consumes engineering resources.

Mechanical changes may require additional prototype parts or tooling.

New components introduce additional lead time.

Sometimes the pressure simply comes from the launch date.

When everyone wants to move faster, another iteration can look like a delay.

But skipping an iteration does not necessarily eliminate the problem that iteration would have exposed.

It may simply move the problem downstream.

## The Cost of Rushing EVT

If a project moves into DVT while important engineering questions from EVT are still unresolved, DVT begins doing two jobs.

The team is trying to validate the design while continuing to solve fundamental engineering problems.

If those issues are not fully closed during DVT, they can move again.

Now PVT may be validating a manufacturing process for a product whose design is still changing.

That is where the timeline becomes fragile.

Changes that were relatively easy during EVT can become much more disruptive later.

Parts may already have been ordered.

Tooling may already exist.

Suppliers may have reserved manufacturing capacity.

Testing plans may have been developed around the previous design.

What looked like a way to save time early can require significantly more time later.

This creates one of the central paradoxes of hardware development:

> **Trying to remove iteration from the schedule can sometimes be exactly what makes the project late.**

The objective should not be to create iterations unnecessarily.

It should be to leave enough room for the development process to reveal what still needs to be learned.

## Lead Time Is Part of the Development Cycle

Another factor that is easy to underestimate is the difference between **engineering time** and **iteration time**.

An engineering change might take a day.

The feedback loop created by that change might take several weeks.

A mechanical engineer modifies a part.

The supplier receives the new drawing.

The change is reviewed and quoted.

Material is sourced.

The part enters the supplier's production queue.

It is manufactured.

The part is shipped.

The new assembly is built.

The team tests it.

Only then does the team know whether the change actually solved the problem.

When manufacturing is happening in another country, logistics can stretch that loop even further.

The CAD modification may have taken four hours.

The iteration may have taken three weeks.

Multiply that across mechanical, electrical, firmware, acoustic, supplier, or manufacturing issues and the original development schedule can change very quickly.

This is why lead time should not be treated as a purchasing detail that sits outside engineering.

For a hardware program, it is part of the development architecture.

## Time-to-Market Is Usually Lost Incrementally

Hardware programs rarely become three months late because of one dramatic event.

The schedule usually slips in smaller pieces.

An EVT build takes longer than expected.

A supplier needs another week.

A test reveals a problem.

A new component has a longer lead time.

A mechanical change requires another set of parts.

DVT begins before everything from EVT is completely closed.

Another validation build becomes necessary.

None of those events alone looks catastrophic.

Together, they move the launch.

By the time the delay becomes obvious, much of the flexibility in the schedule may already be gone.

This is why I increasingly think about time-to-market as an **output of the development process**, rather than simply a date that sits at the end of a roadmap.

A company cannot reliably protect its launch date just by asking each development phase to happen faster.

It protects the launch date by reducing the number of unresolved problems that are allowed to travel from one phase into the next.

## What This Changes

The takeaway is not that hardware teams should move slowly.

Speed matters.

Capital matters.

Market windows matter.

The objective is to move quickly **without treating uncertainty as if it does not exist**.

That means planning for iteration rather than viewing every additional build as a failure of the schedule.

It means involving manufacturing partners early enough that DFM feedback can influence the design before changes become expensive.

It means understanding supplier lead times before they become critical-path surprises.

It means resisting the temptation to declare a validation phase complete simply because the calendar says the next one should begin.

And it means recognizing that finding a problem early is often a good outcome.

An issue discovered during EVT may be frustrating.

The same issue discovered during PVT can be expensive.

The same issue discovered after production starts can be much worse.

Strong hardware teams are not necessarily the teams that encounter fewer problems.

They are often the teams that structure the development process so those problems appear **when they are still relatively inexpensive to solve**.

## Final Thought

Prototypes are exciting because they make an idea tangible.

You can hold one.

Demonstrate it.

Show it to a customer.

Manufacturing readiness is much less visible.

It exists in drawings, tolerances, test results, supplier conversations, build reports, tooling decisions, component availability, process controls, and dozens of small engineering decisions.

But that less visible work is what turns an engineering achievement into a commercial product.

A prototype proves that the idea is possible.

Production requires proving that the result is repeatable.

So after the first prototype works, the most useful question may not be:

**“How quickly can we manufacture this?”**

It may be:

> **“What do we still need to learn before we can manufacture this reliably?”**

The second question sounds slower.

In hardware, it can be the question that gets you to market faster.
